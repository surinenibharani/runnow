import { NextResponse } from "next/server";
import { sendWelcomeNewsletter } from "@/lib/newsletter/send";
import { prisma } from "@/lib/prisma";
import { getClientIp, rateLimitAsync } from "@/lib/security/rate-limit";
import { isHoneypotTriggered, sanitizeText } from "@/lib/security/sanitize";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { isValidEmail } from "@/lib/security/validation";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = await rateLimitAsync(`newsletter:${ip}`, 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many subscription attempts. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfter) },
      }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof body.email === "string"
      ? sanitizeText(body.email, 254).toLowerCase()
      : "";

  const turnstileToken =
    typeof body === "object" &&
    body !== null &&
    "turnstileToken" in body &&
    typeof body.turnstileToken === "string"
      ? body.turnstileToken
      : undefined;

  const website =
    typeof body === "object" && body !== null && "website" in body
      ? body.website
      : undefined;

  if (isHoneypotTriggered(website)) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const captchaOk = await verifyTurnstile(turnstileToken, ip);
  if (!captchaOk) {
    return NextResponse.json(
      { error: "Captcha verification failed." },
      { status: 400 }
    );
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  try {
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      create: {
        email,
        weeklyTips: true,
        newPosts: true,
        progressReminders: false,
        unsubscribedAt: null,
      },
      update: {
        weeklyTips: true,
        newPosts: true,
        unsubscribedAt: null,
      },
    });

    const emailed = await sendWelcomeNewsletter(subscriber.email);

    return NextResponse.json({
      message: emailed
        ? "You're subscribed! Check your inbox for a welcome email."
        : "You're subscribed! Weekly tips and new posts are on the way.",
    });
  } catch (error) {
    console.error("[newsletter] subscribe failed:", error);
    return NextResponse.json(
      { error: "Could not save your subscription. Please try again." },
      { status: 500 }
    );
  }
}
