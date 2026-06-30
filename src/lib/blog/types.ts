export type BlogFigure = {
  src: string;
  alt: string;
  caption?: string;
};

export type BlogSubsection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
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
  cta?: { text: string; href: string };
};

export type BlogFaqItem = {
  question: string;
  answer: string;
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
  readTime: string;
  sections: BlogSection[];
  relatedSlugs?: string[];
  faq?: BlogFaqItem[];
  /** Prompt shown above comments to encourage discussion. */
  closingQuestion?: string;
};
