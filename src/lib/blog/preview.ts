import {
  getBlogPostPublishInstant,
  isBlogPostPublishedAt,
} from "./publish-schedule";

const PUBLISH_TIME_ZONE = "America/New_York";

/** Local dev shows all posts. Production requires `?preview=` matching BLOG_PREVIEW_SECRET. */
export function canPreviewBlogPosts(previewToken?: string | null): boolean {
  if (process.env.NODE_ENV === "development") return true;

  const secret = process.env.BLOG_PREVIEW_SECRET?.trim();
  if (!secret || !previewToken) return false;

  return previewToken === secret;
}

export function isBlogPostVisible(
  publishedAt: string,
  preview: boolean,
  now: Date = new Date()
): boolean {
  if (isBlogPostPublishedAt(publishedAt, now)) return true;
  return preview;
}

export function isBlogPostScheduled(
  publishedAt: string,
  now: Date = new Date()
): boolean {
  return !isBlogPostPublishedAt(publishedAt, now);
}

/** Append to blog links in production preview so navigation stays in preview mode. */
export function getBlogPreviewHrefSuffix(previewToken?: string | null): string {
  if (process.env.NODE_ENV === "development") return "";
  if (!previewToken || !canPreviewBlogPosts(previewToken)) return "";
  return `?preview=${encodeURIComponent(previewToken)}`;
}

export function buildBlogPostHref(
  slug: string,
  previewToken?: string | null
): string {
  return `/blog/${slug}${getBlogPreviewHrefSuffix(previewToken)}`;
}

export function appendBlogPreviewParam(
  href: string,
  previewToken?: string | null
): string {
  const suffix = getBlogPreviewHrefSuffix(previewToken);
  if (!suffix) return href;
  return href.includes("?")
    ? `${href}&${suffix.slice(1)}`
    : `${href}${suffix}`;
}

export function formatBlogPostPublishSchedule(publishedAt: string): string {
  const ms = getBlogPostPublishInstant(publishedAt);

  return new Date(ms).toLocaleString("en-US", {
    timeZone: PUBLISH_TIME_ZONE,
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}
