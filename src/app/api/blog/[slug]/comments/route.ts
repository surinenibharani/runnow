import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { blogPosts, getPostBySlug } from "@/lib/blog/posts";
import { isEmailConfigured, sendEmail } from "@/lib/email/client";
import { newCommentEmail } from "@/lib/email/templates";
import { getClientIp, rateLimitAsync } from "@/lib/security/rate-limit";
import { isHoneypotTriggered, sanitizeText } from "@/lib/security/sanitize";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { isValidPostSlug } from "@/lib/security/validation";

const COMMENT_NOTIFY_EMAIL =
  process.env.COMMENT_NOTIFY_EMAIL?.trim() || "letsrunnow79@gmail.com";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

const ALLOWED_SLUGS = blogPosts.map((p) => p.slug);

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;

  if (!isValidPostSlug(slug, ALLOWED_SLUGS)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const comments = await prisma.blogComment.findMany({
    where: { postSlug: slug },
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      authorName: true,
      content: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ comments });
}

export async function POST(request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    if (!isValidPostSlug(slug, ALLOWED_SLUGS)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const ip = getClientIp(request);
    const limit = await rateLimitAsync(`comment:${ip}:${slug}`, 5, 60 * 60 * 1000);
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many comments. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(limit.retryAfter) },
        }
      );
    }

    const body = await request.json();
    const { authorName, content, turnstileToken, website } = body;

    if (isHoneypotTriggered(website)) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const session = await auth();
    if (session?.user?.id) {
      const userLimit = await rateLimitAsync(
        `comment:user:${session.user.id}`,
        20,
        60 * 60 * 1000
      );
      if (!userLimit.ok) {
        return NextResponse.json(
          { error: "Too many comments. Please try again later." },
          {
            status: 429,
            headers: { "Retry-After": String(userLimit.retryAfter) },
          }
        );
      }
    }

    const captchaOk = await verifyTurnstile(turnstileToken, ip);
    if (!captchaOk) {
      return NextResponse.json(
        { error: "Captcha verification failed" },
        { status: 400 }
      );
    }

    const name = sanitizeText(
      session?.user?.name || authorName,
      60
    );
    const text = sanitizeText(content, 2000);

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid name" },
        { status: 400 }
      );
    }

    if (!text || text.length < 3) {
      return NextResponse.json(
        { error: "Comment must be at least 3 characters" },
        { status: 400 }
      );
    }

    const comment = await prisma.blogComment.create({
      data: {
        postSlug: slug,
        authorName: name,
        content: text,
        userId: session?.user?.id ?? null,
      },
      select: {
        id: true,
        authorName: true,
        content: true,
        createdAt: true,
      },
    });

    if (isEmailConfigured()) {
      const post = getPostBySlug(slug);
      const message = newCommentEmail({
        postSlug: slug,
        postTitle: post?.title ?? slug,
        authorName: comment.authorName,
        content: comment.content,
      });
      void sendEmail({
        to: COMMENT_NOTIFY_EMAIL,
        subject: message.subject,
        html: message.html,
        text: message.text,
      }).catch((err) => {
        console.error("[email] Failed to send comment notification:", err);
      });
    }

    return NextResponse.json({ comment }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 }
    );
  }
}
