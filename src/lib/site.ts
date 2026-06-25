export const SITE_NAME = "LetsRunNow";
export const SITE_TAGLINE = "Start Running Today";
export const SITE_DESCRIPTION =
  "Tired of overwhelming running apps? LetsRunNow is the simple, free, no-signup Couch to 5K & marathon training site for real beginners.";
export const SITE_KEYWORDS = [
  "beginner running",
  "couch to 5k",
  "free training plan",
] as const;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.AUTH_URL ||
  "http://localhost:3000";
