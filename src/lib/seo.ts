import type { BlogPost } from "@/lib/blog/types";
import { BRAND_ICON_PATH, BRAND_LOGO_PATH } from "@/lib/brand";
import { OG_IMAGE_PATH, truncateMetaDescription } from "@/lib/seo/metadata";
import {
  INSTAGRAM_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${BRAND_LOGO_PATH}`,
    image: `${SITE_URL}${BRAND_ICON_PATH}`,
    slogan: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    sameAs: [INSTAGRAM_URL],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: `${SITE_NAME} — ${SITE_TAGLINE}`,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${BRAND_LOGO_PATH}`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleJsonLd(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const headline = post.metaTitle ?? post.title;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description: truncateMetaDescription(post.excerpt),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
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
        url: `${SITE_URL}${BRAND_LOGO_PATH}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function faqPageJsonLd(
  faqs: { question: string; answer: string }[],
  pageUrl: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: pageUrl,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"),
      },
    })),
  };
}

export function webPageJsonLd(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: truncateMetaDescription(opts.description),
    url: `${SITE_URL}${opts.path}`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${BRAND_LOGO_PATH}`,
      },
    },
  };
}

export function blogIndexJsonLd(
  posts: { title: string; slug: string; excerpt: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Running Blog`,
    url: `${SITE_URL}/blog`,
    description:
      "Beginner-friendly running articles on training, nutrition, and mindset.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${BRAND_LOGO_PATH}`,
      },
    },
    blogPost: posts.slice(0, 20).map((post, index) => ({
      "@type": "BlogPosting",
      position: index + 1,
      headline: post.title,
      description: truncateMetaDescription(post.excerpt),
      url: `${SITE_URL}/blog/${post.slug}`,
    })),
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
