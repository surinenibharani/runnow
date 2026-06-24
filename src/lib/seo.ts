import type { BlogPost } from "@/lib/blog/types";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: `${SITE_NAME} — ${SITE_TAGLINE}. Free beginner running plans from 5K to marathon.`,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: "Beginner-friendly running plans, tips, and training guides.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

import { OG_IMAGE_PATH } from "@/lib/seo/metadata";

export function articleJsonLd(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    url,
    image: [`${SITE_URL}${OG_IMAGE_PATH}`],
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function blogIndexJsonLd(postCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Running Blog`,
    url: `${SITE_URL}/blog`,
    description: "Beginner-friendly running articles on training, nutrition, and mindset.",
    blogPost: {
      "@type": "ItemList",
      numberOfItems: postCount,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
