import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = { ok: true } | { ok: false; retryAfter: number };

const store = new Map<string, RateLimitEntry>();
const MAX_STORE_ENTRIES = 10_000;

let redisClient: Redis | null | undefined;
const limiterCache = new Map<string, Ratelimit>();
let warnedMissingUpstash = false;

function warnIfMissingDistributedRateLimit() {
  if (warnedMissingUpstash) return;
  if (
    process.env.NODE_ENV === "production" &&
    !isDistributedRateLimitEnabled()
  ) {
    warnedMissingUpstash = true;
    console.warn(
      "[rate-limit] UPSTASH_REDIS_REST_URL/TOKEN not set — using in-memory limits that do not share across serverless instances."
    );
  }
}

function pruneStore(now: number) {
  if (store.size <= MAX_STORE_ENTRIES) return;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
    if (store.size <= MAX_STORE_ENTRIES * 0.8) break;
  }
}

/**
 * Client IP for rate limits. Prefer platform-provided headers that clients
 * cannot spoof. Never trust the first X-Forwarded-For hop — on Vercel the
 * client can prepend an address and the platform appends the real one.
 */
export function getClientIp(request: Request): string {
  const vercel = request.headers
    .get("x-vercel-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  if (vercel) return vercel;

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const hops = forwarded
      .split(",")
      .map((hop) => hop.trim())
      .filter(Boolean);
    if (hops.length > 0) return hops[hops.length - 1]!;
  }

  return "unknown";
}

/** Auth and write endpoints must not fall open if Redis is missing in production. */
const FAIL_CLOSED_KEY =
  /^(login|auth|register|account-status|newsletter|testimonial|comment|blog-preview|team-join|team-create|stripe-checkout|strava-webhook|like):/;

function shouldFailClosedWithoutRedis(key: string): boolean {
  return (
    process.env.NODE_ENV === "production" && FAIL_CLOSED_KEY.test(key)
  );
}

export function isDistributedRateLimitEnabled(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() &&
      process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
  );
}

function getRedisClient(): Redis | null {
  if (redisClient !== undefined) return redisClient;

  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) {
    redisClient = null;
    return null;
  }

  redisClient = new Redis({ url, token });
  return redisClient;
}

function getDistributedLimiter(limit: number, windowMs: number): Ratelimit | null {
  const redis = getRedisClient();
  if (!redis) return null;

  const windowSec = Math.max(1, Math.ceil(windowMs / 1000));
  const cacheKey = `${limit}:${windowSec}`;
  const cached = limiterCache.get(cacheKey);
  if (cached) return cached;

  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
    prefix: "runnow:rl",
    analytics: false,
  });
  limiterCache.set(cacheKey, limiter);
  return limiter;
}

/** Process-local fallback for development or when Upstash is not configured. */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  pruneStore(now);
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (entry.count >= limit) {
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  entry.count += 1;
  return { ok: true };
}

/** Shared rate limit via Upstash Redis when configured; falls back to in-memory. */
export async function rateLimitAsync(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const distributed = getDistributedLimiter(limit, windowMs);
  if (!distributed) {
    if (shouldFailClosedWithoutRedis(key)) {
      console.error(
        `[rate-limit] refusing ${key.split(":")[0]} — Upstash Redis is not configured in production.`
      );
      return { ok: false, retryAfter: 60 };
    }
    warnIfMissingDistributedRateLimit();
    return rateLimit(key, limit, windowMs);
  }

  const result = await distributed.limit(key);
  if (result.success) {
    return { ok: true };
  }

  return {
    ok: false,
    retryAfter: Math.max(
      1,
      Math.ceil((result.reset - Date.now()) / 1000)
    ),
  };
}

export function tooManyRequestsResponse(
  retryAfter: number,
  message = "Too many attempts. Please try again later."
): NextResponse {
  return NextResponse.json(
    { error: message },
    { status: 429, headers: { "Retry-After": String(retryAfter) } }
  );
}

/** Returns a 429 response when limited, otherwise null. */
export async function enforceRateLimit(
  key: string,
  limit: number,
  windowMs: number,
  message?: string
): Promise<NextResponse | null> {
  const result = await rateLimitAsync(key, limit, windowMs);
  if (!result.ok) {
    return tooManyRequestsResponse(result.retryAfter, message);
  }
  return null;
}

/** IP-scoped rate limit helper for public routes. */
export async function enforceRateLimitForIp(
  request: Request,
  prefix: string,
  limit: number,
  windowMs: number,
  message?: string
): Promise<NextResponse | null> {
  return enforceRateLimit(
    `${prefix}:${getClientIp(request)}`,
    limit,
    windowMs,
    message
  );
}
