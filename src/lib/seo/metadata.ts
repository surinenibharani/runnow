import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const OG_IMAGE_PATH = "/opengraph-image";

export function ogImageMeta() {
  return [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: SITE_NAME }];
}

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogType?: "website" | "article";
  titleAbsolute?: boolean;
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  const images = ogImageMeta();
  const fullTitle = opts.title.includes(SITE_NAME)
    ? opts.title
    : `${opts.title} | ${SITE_NAME}`;

  return {
    title: opts.titleAbsolute ? { absolute: opts.title } : opts.title,
    description: opts.description,
    ...(opts.noindex && {
      robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    }),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: opts.description,
      url,
      type: opts.ogType ?? "website",
      siteName: SITE_NAME,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: opts.description,
      images: [OG_IMAGE_PATH],
    },
  };
}
