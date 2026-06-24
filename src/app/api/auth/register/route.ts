import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getClientIp, rateLimit } from "@/lib/security/rate-limit";
import { isHoneypotTriggered, sanitizeText } from "@/lib/security/sanitize";
import { verifyTurnstile } from "@/lib/security/turnstile";
import {
  isValidEmail,
  isValidPassword,
  parseAge,
} from "@/lib/security/validation";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(`register:${ip}`, 5, 60 * 60 * 1000);
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many registration attempts. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(limit.retryAfter) },
        }
      );
    }

    const body = await request.json();
    const { name, email, password, age, turnstileToken, website } = body;

    if (isHoneypotTriggered(website)) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const captchaOk = await verifyTurnstile(turnstileToken, ip);
    if (!captchaOk) {
      return NextResponse.json(
        { error: "Captcha verification failed" },
        { status: 400 }
      );
    }

    const cleanEmail = sanitizeText(email, 254).toLowerCase();
    const cleanName = sanitizeText(name, 80) || null;

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { error: "A valid email is required" },
        { status: 400 }
      );
    }

    if (!password || !isValidPassword(String(password))) {
      return NextResponse.json(
        { error: "Password must be 8–128 characters" },
        { status: 400 }
      );
    }

    const parsedAge = parseAge(age);
    if (age !== undefined && age !== null && age !== "" && parsedAge === null) {
      return NextResponse.json(
        { error: "Age must be between 13 and 100" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(String(password), 12);

    const user = await prisma.user.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        passwordHash,
        age: parsedAge,
      },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
