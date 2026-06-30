import {
  getBlogPostPublishInstant,
  isBlogPostPublishedAt,
} from "./publish-schedule";

const PUBLISH_TIME_ZONE = "America/New_York";

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

/** Preview navigation uses a session cookie — no query suffix needed. */
export function getBlogPreviewHrefSuffix(_previewToken?: string | null): string {
  return "";
}

export function buildBlogPostHref(slug: string, _previewToken?: string | null): string {
  return `/blog/${slug}`;
}

export function appendBlogPreviewParam(href: string, _previewToken?: string | null): string {
  return href;
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

/** @deprecated Preview mode is cookie-based; use server helpers in `./preview-server`. */
export function canPreviewBlogPosts(_previewToken?: string | null): boolean {
  return process.env.NODE_ENV === "development";
}
