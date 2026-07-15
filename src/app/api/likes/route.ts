import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { blogPosts } from "@/lib/blog/posts";
import { getAllTipSlugs } from "@/lib/tips/helpers";
import { getClientIp, rateLimitAsync } from "@/lib/security/rate-limit";
import { isValidPostSlug } from "@/lib/security/validation";
import {
  anonCookieOptions,
  LIKE_ANON_COOKIE,
  resolveLikeIdentity,
  type ContentLikeTargetType,
} from "@/lib/engagement/content-likes";

const BLOG_SLUGS = blogPosts.map((p) => p.slug);
const TIP_SLUGS = getAllTipSlugs();

function parseTargetType(raw: unknown): ContentLikeTargetType | null {
  if (raw === "blog" || raw === "tip") return raw;
  return null;
}

function isAllowedSlug(type: ContentLikeTargetType, slug: string): boolean {
  return isValidPostSlug(slug, type === "blog" ? BLOG_SLUGS : TIP_SLUGS);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetType = parseTargetType(searchParams.get("type"));
  const targetSlug = searchParams.get("slug")?.trim() ?? "";

  if (!targetType || !targetSlug || !isAllowedSlug(targetType, targetSlug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const { identityKey } = await resolveLikeIdentity();

    const [count, likedRow] = await Promise.all([
      prisma.contentLike.count({
        where: { targetType, targetSlug },
      }),
      identityKey
        ? prisma.contentLike.findUnique({
            where: {
              identityKey_targetType_targetSlug: {
                identityKey,
                targetType,
                targetSlug,
              },
            },
            select: { id: true },
          })
        : Promise.resolve(null),
    ]);

    return NextResponse.json({ count, liked: Boolean(likedRow) });
  } catch {
    return NextResponse.json({ count: 0, liked: false });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      type?: unknown;
      slug?: unknown;
    };
    const targetType = parseTargetType(body.type);
    const targetSlug =
      typeof body.slug === "string" ? body.slug.trim() : "";

    if (!targetType || !targetSlug || !isAllowedSlug(targetType, targetSlug)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const identity = await resolveLikeIdentity({ createIfMissing: true });
    if (!identity.identityKey) {
      return NextResponse.json(
        { error: "Could not identify liker" },
        { status: 400 }
      );
    }

    const ip = getClientIp(request);
    const rateKey = identity.userId
      ? `like:user:${identity.userId}`
      : `like:ip:${ip}`;
    const limit = await rateLimitAsync(rateKey, 60, 60 * 60 * 1000);
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many likes. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(limit.retryAfter) },
        }
      );
    }

    const existing = await prisma.contentLike.findUnique({
      where: {
        identityKey_targetType_targetSlug: {
          identityKey: identity.identityKey,
          targetType,
          targetSlug,
        },
      },
      select: { id: true },
    });

    if (existing) {
      await prisma.contentLike.delete({ where: { id: existing.id } });
    } else {
      await prisma.contentLike.create({
        data: {
          identityKey: identity.identityKey,
          targetType,
          targetSlug,
          userId: identity.userId,
        },
      });
    }

    const count = await prisma.contentLike.count({
      where: { targetType, targetSlug },
    });

    const response = NextResponse.json({ count, liked: !existing });
    if (identity.newAnonId) {
      response.cookies.set(
        LIKE_ANON_COOKIE,
        identity.newAnonId,
        anonCookieOptions()
      );
    }
    return response;
  } catch {
    return NextResponse.json(
      { error: "Could not update like" },
      { status: 500 }
    );
  }
}
