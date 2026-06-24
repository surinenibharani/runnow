import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { blogPosts } from "@/lib/blog/posts";
import { getClientIp, rateLimit } from "@/lib/security/rate-limit";
import { isHoneypotTriggered, sanitizeText } from "@/lib/security/sanitize";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { isValidPostSlug } from "@/lib/security/validation";

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
    const limit = rateLimit(`comment:${ip}:${slug}`, 5, 60 * 60 * 1000);
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
    const captchaOk = await verifyTurnstile(turnstileToken, ip);
    if (!captchaOk && !session?.user) {
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

    return NextResponse.json({ comment }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 }
    );
  }
}
