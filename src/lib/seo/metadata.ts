import type { Metadata } from "next";
import { BRAND_CAPTION } from "@/lib/brand";
import { SITE_NAME, SITE_URL, TWITTER_HANDLE } from "@/lib/site";

export const OG_IMAGE_PATH = "/opengraph-image";

/** SERP-friendly description length (Google typically shows ~150–160 chars). */
export const META_DESCRIPTION_MAX = 158;

export function truncateMetaDescription(
  text: string,
  max = META_DESCRIPTION_MAX
): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const base = lastSpace > 80 ? slice.slice(0, lastSpace) : slice;
  return `${base.replace(/[.,;:!?-]+$/, "")}…`;
}

export function seoTitle(title: string): string {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

export function ogImageMeta() {
  return [
    {
      url: OG_IMAGE_PATH,
      width: 1200,
      height: 630,
      alt: `${SITE_NAME} — ${BRAND_CAPTION}`,
    },
  ];
}

/** Per-post dynamic OG image served at /blog/[slug]/opengraph-image. */
export function postOgImageMeta(slug: string, alt: string) {
  const url = `/blog/${slug}/opengraph-image`;
  return [
    {
      url,
      width: 1200,
      height: 630,
      alt,
    },
  ];
}

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogType?: "website" | "article";
  titleAbsolute?: boolean;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  const images = ogImageMeta();
  const description = truncateMetaDescription(opts.description);
  const fullTitle = seoTitle(opts.title);

  return {
    title: opts.titleAbsolute ? { absolute: opts.title } : opts.title,
    description,
    ...(opts.keywords?.length ? { keywords: opts.keywords } : {}),
    ...(opts.noindex && {
      robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    }),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type: opts.ogType ?? "website",
      siteName: SITE_NAME,
      images,
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title: fullTitle,
      description,
      images: [OG_IMAGE_PATH],
    },
  };
}

export function twitterSiteMeta() {
  return { site: TWITTER_HANDLE };
}
