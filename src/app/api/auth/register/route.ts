import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getClientIp, rateLimitAsync } from "@/lib/security/rate-limit";
import { isHoneypotTriggered, sanitizeText } from "@/lib/security/sanitize";
import { verifyTurnstile } from "@/lib/security/turnstile";
import {
  isValidEmail,
  isValidPassword,
  parseAge,
  parseGender,
  parseHeightCm,
  parseWeightKg,
  passwordValidationMessage,
} from "@/lib/security/validation";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = await rateLimitAsync(`register:${ip}`, 5, 60 * 60 * 1000);
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
    const { name, email, password, age, gender, weightKg, heightCm, turnstileToken, website } = body;

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
        {
          error:
            passwordValidationMessage(String(password)) ??
            "Choose a stronger password with uppercase, lowercase, a number, and a symbol.",
        },
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

    const parsedGender = parseGender(gender);
    if (
      gender !== undefined &&
      gender !== null &&
      gender !== "" &&
      parsedGender === null
    ) {
      return NextResponse.json({ error: "Invalid gender" }, { status: 400 });
    }

    const parsedWeightKg = parseWeightKg(weightKg);
    if (
      weightKg !== undefined &&
      weightKg !== null &&
      weightKg !== "" &&
      parsedWeightKg === null
    ) {
      return NextResponse.json({ error: "Invalid weight" }, { status: 400 });
    }

    const parsedHeightCm = parseHeightCm(heightCm);
    if (
      heightCm !== undefined &&
      heightCm !== null &&
      heightCm !== "" &&
      parsedHeightCm === null
    ) {
      return NextResponse.json({ error: "Invalid height" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existing) {
      return NextResponse.json(
        {
          error:
            "Unable to create an account with those details. Try signing in instead.",
        },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(String(password), 12);

    const user = await prisma.user.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        passwordHash,
        age: parsedAge,
        gender: parsedGender,
        weightKg: parsedWeightKg,
        heightCm: parsedHeightCm,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
