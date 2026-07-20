import { after } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { blogPostSlugs, getPostBySlug } from "@/lib/blog/posts";
import { isEmailConfigured, sendEmail } from "@/lib/email/client";
import { newCommentEmail } from "@/lib/email/templates";
import { getClientIp, rateLimitAsync } from "@/lib/security/rate-limit";
import { isHoneypotTriggered, sanitizeText } from "@/lib/security/sanitize";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { isValidPostSlug } from "@/lib/security/validation";
import { getAllTipSlugs, getTipBySlug } from "@/lib/tips/helpers";
import { SITE_URL } from "@/lib/site";

export type CommentTargetType = "blog" | "tip";

const COMMENT_NOTIFY_EMAIL =
  process.env.COMMENT_NOTIFY_EMAIL?.trim() || "letsrunnow79@gmail.com";

const TIP_SLUGS = getAllTipSlugs();

function isAllowedSlug(type: CommentTargetType, slug: string): boolean {
  return isValidPostSlug(slug, type === "blog" ? blogPostSlugs : TIP_SLUGS);
}

/** DB key keeps tip comments namespaced to avoid future slug collisions. */
export function commentStorageSlug(
  type: CommentTargetType,
  slug: string
): string {
  return type === "tip" ? `tip:${slug}` : slug;
}

function commentPageUrl(type: CommentTargetType, slug: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  return type === "tip"
    ? `${base}/tips/${slug}#comments`
    : `${base}/blog/${slug}#comments`;
}

function commentTitle(type: CommentTargetType, slug: string): string {
  if (type === "tip") {
    return getTipBySlug(slug)?.title ?? slug;
  }
  return getPostBySlug(slug)?.title ?? slug;
}

export async function listComments(type: CommentTargetType, slug: string) {
  if (!isAllowedSlug(type, slug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const comments = await prisma.blogComment.findMany({
    where: { postSlug: commentStorageSlug(type, slug) },
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

export async function createComment(
  request: Request,
  type: CommentTargetType,
  slug: string
) {
  try {
    if (!isAllowedSlug(type, slug)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const ip = getClientIp(request);
    const storageSlug = commentStorageSlug(type, slug);
    const limit = await rateLimitAsync(
      `comment:${ip}:${storageSlug}`,
      5,
      60 * 60 * 1000
    );
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

    const name = sanitizeText(session?.user?.name || authorName, 60);
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
        postSlug: storageSlug,
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

    const title = commentTitle(type, slug);
    const pageUrl = commentPageUrl(type, slug);

    after(async () => {
      if (!isEmailConfigured()) {
        console.error(
          "[email] Comment posted but RESEND_API_KEY/EMAIL_FROM are not configured — notification not sent."
        );
        return;
      }

      const message = newCommentEmail({
        contentType: type,
        slug,
        title,
        authorName: comment.authorName,
        content: comment.content,
        pageUrl,
      });

      const result = await sendEmail({
        to: COMMENT_NOTIFY_EMAIL,
        subject: message.subject,
        html: message.html,
        text: message.text,
      });

      if (!result.ok) {
        console.error(
          `[email] Failed to send comment notification to ${COMMENT_NOTIFY_EMAIL}:`,
          result.error
        );
      }
    });

    return NextResponse.json({ comment }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 }
    );
  }
}
