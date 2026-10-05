import { BRAND_CAPTION } from "@/lib/brand";

export const SITE_NAME = "LetsRunNow";
/** Matches the logo caption. */
export const SITE_TAGLINE = BRAND_CAPTION;
export const SITE_DESCRIPTION =
  "Beginner-friendly running plans for every level — never ran, coming back from a break, or chasing a 5K, 10K, half, or marathon. Walk-run is allowed. Tips, injury prevention, and how to get better, in your browser. No app required.";
export const SITE_KEYWORDS = [
  "couch to 5k free plan",
  "beginner running schedule no app",
  "free 5k training plan beginner",
  "return to running after a break",
  "intermediate running training plan",
  "free marathon training plan",
  "half marathon training plan free",
  "how to start running beginner",
  "running injury prevention",
  "running plan in browser",
  "LetsRunNow",
] as const;
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.AUTH_URL ||
  "http://localhost:3000"
).replace(/\/$/, "");

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

/** Public support inbox — set NEXT_PUBLIC_SUPPORT_EMAIL in production if needed. */
export const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "hello@letsrunnow.com";
