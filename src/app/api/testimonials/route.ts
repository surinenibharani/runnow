import { after } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isEmailConfigured, sendEmail } from "@/lib/email/client";
import { newTestimonialEmail } from "@/lib/email/templates";
import { getClientIp, rateLimitAsync } from "@/lib/security/rate-limit";
import { isHoneypotTriggered, sanitizeText } from "@/lib/security/sanitize";
import { verifyTurnstile } from "@/lib/security/turnstile";

const COMMENT_NOTIFY_EMAIL =
  process.env.COMMENT_NOTIFY_EMAIL?.trim() || "letsrunnow79@gmail.com";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true,
        authorName: true,
        quote: true,
        story: true,
        detail: true,
        milestone: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ testimonials });
  } catch {
    return NextResponse.json(
      { error: "Failed to load testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = await rateLimitAsync(
      `testimonial:${ip}`,
      3,
      60 * 60 * 1000
    );
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(limit.retryAfter) },
        }
      );
    }

    const body = await request.json();
    const { authorName, quote, story, detail, milestone, turnstileToken, website } =
      body;

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

    const name = sanitizeText(authorName, 60);
    const quoteText = sanitizeText(quote, 280);
    const storyText = story != null && story !== "" ? sanitizeText(story, 2000) : null;
    const detailText =
      detail != null && detail !== "" ? sanitizeText(detail, 120) : null;
    const milestoneText =
      milestone != null && milestone !== ""
        ? sanitizeText(milestone, 120)
        : null;

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid name" },
        { status: 400 }
      );
    }

    if (!quoteText || quoteText.length < 10) {
      return NextResponse.json(
        { error: "Please write a short quote (at least 10 characters)" },
        { status: 400 }
      );
    }

    if (storyText != null && storyText.length > 0 && storyText.length < 20) {
      return NextResponse.json(
        { error: "Story should be at least 20 characters, or leave it blank" },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        authorName: name,
        quote: quoteText,
        story: storyText || null,
        detail: detailText || null,
        milestone: milestoneText || null,
      },
      select: {
        id: true,
        authorName: true,
        quote: true,
        story: true,
        detail: true,
        milestone: true,
        createdAt: true,
      },
    });

    after(async () => {
      if (!isEmailConfigured()) {
        console.error(
          "[email] Testimonial posted but RESEND_API_KEY/EMAIL_FROM are not configured — notification not sent."
        );
        return;
      }

      const message = newTestimonialEmail({
        authorName: testimonial.authorName,
        quote: testimonial.quote,
        story: testimonial.story,
        detail: testimonial.detail,
        milestone: testimonial.milestone,
      });

      const result = await sendEmail({
        to: COMMENT_NOTIFY_EMAIL,
        subject: message.subject,
        html: message.html,
        text: message.text,
      });

      if (!result.ok) {
        console.error(
          `[email] Failed to send testimonial notification to ${COMMENT_NOTIFY_EMAIL}:`,
          result.error
        );
      }
    });

    return NextResponse.json({ testimonial }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit testimonial" },
      { status: 500 }
    );
  }
}
