import { NextResponse } from "next/server";
import { sendWelcomeNewsletter } from "@/lib/newsletter/send";
import { prisma } from "@/lib/prisma";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
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
      ? body.email.trim().toLowerCase()
      : "";

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

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
}
