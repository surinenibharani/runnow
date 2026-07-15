import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type ContentLikeTargetType = "blog" | "tip";

export type ContentLikeState = {
  count: number;
  liked: boolean;
};

export const LIKE_ANON_COOKIE = "lrn_like_id";
const ANON_COOKIE_MAX_AGE = 60 * 60 * 24 * 400; // ~13 months

export function userIdentityKey(userId: string): string {
  return `user:${userId}`;
}

export function anonIdentityKey(anonId: string): string {
  return `anon:${anonId}`;
}

export function createAnonLikeId(): string {
  return crypto.randomUUID();
}

export function anonCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: ANON_COOKIE_MAX_AGE,
  };
}

/** Resolve the liking identity for the current request (user or anon cookie). */
export async function resolveLikeIdentity(options?: {
  /** When true, create an anon cookie id if missing (API toggle only). */
  createIfMissing?: boolean;
}): Promise<{
  identityKey: string | null;
  userId: string | null;
  anonId: string | null;
  /** New anon id that must be written to the response cookie jar. */
  newAnonId: string | null;
}> {
  const session = await auth();
  const userId = session?.user?.id ?? null;
  if (userId) {
    return {
      identityKey: userIdentityKey(userId),
      userId,
      anonId: null,
      newAnonId: null,
    };
  }

  const cookieStore = await cookies();
  const existing = cookieStore.get(LIKE_ANON_COOKIE)?.value?.trim() || null;
  if (existing) {
    return {
      identityKey: anonIdentityKey(existing),
      userId: null,
      anonId: existing,
      newAnonId: null,
    };
  }

  if (!options?.createIfMissing) {
    return {
      identityKey: null,
      userId: null,
      anonId: null,
      newAnonId: null,
    };
  }

  const anonId = createAnonLikeId();
  return {
    identityKey: anonIdentityKey(anonId),
    userId: null,
    anonId,
    newAnonId: anonId,
  };
}

export async function getContentLikeState(
  targetType: ContentLikeTargetType,
  targetSlug: string,
  identityKey?: string | null
): Promise<ContentLikeState> {
  try {
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

    return { count, liked: Boolean(likedRow) };
  } catch {
    return { count: 0, liked: false };
  }
}

/** SSR helper: resolve like state for the current user or anonymous cookie. */
export async function getContentLikeStateForSession(
  targetType: ContentLikeTargetType,
  targetSlug: string
): Promise<ContentLikeState> {
  const { identityKey } = await resolveLikeIdentity();
  return getContentLikeState(targetType, targetSlug, identityKey);
}
