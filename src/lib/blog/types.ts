export type BlogFigure = {
  src: string;
  alt: string;
  caption?: string;
};

export type BlogSubsection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  /** Rendered after the subsection list when present. */
  closingParagraphs?: string[];
  variant?: "quote";
};

export type BlogSection = {
  /** Stable anchor for table-of-contents links, e.g. `gear`. */
  id?: string;
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  figures?: BlogFigure[];
  subsections?: BlogSubsection[];
  /** Rendered after the list and subsections when present. */
  closingParagraphs?: string[];
  cta?: { text: string; href: string };
};

export type BlogFaqItem = {
  question: string;
  answer: string;
};

/** Authoritative reference for "Sources & further reading" on a post. */
export type BlogSource = {
  label: string;
  href: string;
  /** Publisher shown after the label, e.g. "Mayo Clinic" or "NHS". */
  publisher?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  /** Optional SEO title override (browser tab / Open Graph). */
  metaTitle?: string;
  excerpt: string;
  whyItMatters?: string;
  category: string;
  author: string;
  publishedAt: string;
  /** When content was last updated — used for sitemap and Article schema. */
  updatedAt?: string;
  readTime: string;
  sections: BlogSection[];
  relatedSlugs?: string[];
  faq?: BlogFaqItem[];
  /** Authoritative references rendered as "Sources & further reading". */
  sources?: BlogSource[];
  /** Prompt shown above comments to encourage discussion. */
  closingQuestion?: string;
};

/** Fields needed for blog index cards — omit body sections for smaller RSC payloads. */
export type BlogPostCardSummary = Pick<
  BlogPost,
  | "slug"
  | "title"
  | "excerpt"
  | "whyItMatters"
  | "category"
  | "author"
  | "publishedAt"
  | "readTime"
>;
