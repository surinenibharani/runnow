import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  BLOG_PREVIEW_COOKIE,
  createPreviewSessionValue,
  isValidPreviewSecret,
  previewSessionCookieOptions,
} from "@/lib/blog/preview-session";
import { getClientIp, rateLimitAsync } from "@/lib/security/rate-limit";

const PREVIEW_MAX_AGE_SEC = 24 * 60 * 60;

function redirectTarget(request: Request): string {
  const next = new URL(request.url).searchParams.get("next")?.trim();
  if (next && next.startsWith("/") && !next.startsWith("//")) {
    return next;
  }
  return "/blog";
}

async function enforcePreviewRateLimit(request: Request) {
  const ip = getClientIp(request);
  const limited = await rateLimitAsync(`blog-preview:${ip}`, 20, 15 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many preview attempts. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfter) },
      }
    );
  }
  return null;
}

/** Exchange BLOG_PREVIEW_SECRET for an HttpOnly preview session cookie. */
export async function GET(request: Request) {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.redirect(new URL(redirectTarget(request), request.url));
  }

  const rateLimited = await enforcePreviewRateLimit(request);
  if (rateLimited) return rateLimited;

  const token = new URL(request.url).searchParams.get("token")?.trim();
  const secret = process.env.BLOG_PREVIEW_SECRET?.trim();

  if (!secret) {
    return NextResponse.json(
      { error: "Blog preview is not configured." },
      { status: 503 }
    );
  }

  if (!isValidPreviewSecret(token)) {
    return NextResponse.json({ error: "Invalid preview token." }, { status: 403 });
  }

  const cookieStore = await cookies();
  cookieStore.set(
    BLOG_PREVIEW_COOKIE,
    createPreviewSessionValue(secret),
    previewSessionCookieOptions(PREVIEW_MAX_AGE_SEC)
  );

  return NextResponse.redirect(new URL(redirectTarget(request), request.url));
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.json({ ok: true, redirect: redirectTarget(request) });
  }

  const rateLimited = await enforcePreviewRateLimit(request);
  if (rateLimited) return rateLimited;

  const secret = process.env.BLOG_PREVIEW_SECRET?.trim();
  if (!secret) {
    return NextResponse.json(
      { error: "Blog preview is not configured." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const token =
    typeof body === "object" &&
    body !== null &&
    "token" in body &&
    typeof body.token === "string"
      ? body.token.trim()
      : "";

  if (!isValidPreviewSecret(token)) {
    return NextResponse.json({ error: "Invalid preview token." }, { status: 403 });
  }

  const cookieStore = await cookies();
  cookieStore.set(
    BLOG_PREVIEW_COOKIE,
    createPreviewSessionValue(secret),
    previewSessionCookieOptions(PREVIEW_MAX_AGE_SEC)
  );

  return NextResponse.json({ ok: true, redirect: redirectTarget(request) });
}
