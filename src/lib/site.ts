import { BRAND_CAPTION } from "@/lib/brand";

export const SITE_NAME = "LetsRunNow";
/** Matches the logo caption. */
export const SITE_TAGLINE = BRAND_CAPTION;
export const SITE_DESCRIPTION =
  "Free couch to 5K, 10K, half marathon, and marathon training plans — a beginner running schedule in your browser, no app required. Pick a plan, track progress, and optional Strava sync. Run with us.";
export const SITE_KEYWORDS = [
  "couch to 5k free plan",
  "beginner running schedule no app",
  "free 5k training plan beginner",
  "couch to 5k no app",
  "beginner running plan free",
  "free marathon training plan beginner",
  "half marathon training plan free",
  "how to start running beginner",
  "running plan in browser",
  "LetsRunNow",
] as const;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.AUTH_URL ||
  "http://localhost:3000";

/** Public Instagram profile — set NEXT_PUBLIC_INSTAGRAM_URL in production. */
export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ||
  "https://www.instagram.com/letsrunnowcoach";

/** Instagram username without @ — for display and share copy. */
export const INSTAGRAM_HANDLE =
  process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE?.trim() || "letsrunnowcoach";

/** Twitter/X handle for social cards — set NEXT_PUBLIC_TWITTER_HANDLE in production. */
export const TWITTER_HANDLE =
  process.env.NEXT_PUBLIC_TWITTER_HANDLE?.trim() || "@letsrunnow";
