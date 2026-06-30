import { SITE_URL } from "@/lib/site";
import { buildBlogPostHref } from "./preview";

export function getBlogPostCanonicalUrl(
  slug: string,
  previewToken?: string | null
): string {
  const base = SITE_URL.replace(/\/$/, "");
  return `${base}${buildBlogPostHref(slug, previewToken)}`;
}

/** Host + path only, e.g. letsrunnow.com/blog/first-run-tips */
export function getBlogPostDisplayUrl(slug: string): string {
  try {
    const url = new URL(getBlogPostCanonicalUrl(slug));
    return `${url.host}${url.pathname}`;
  } catch {
    return `/blog/${slug}`;
  }
}
