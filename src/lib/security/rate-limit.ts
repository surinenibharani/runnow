import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

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

export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
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
