export type BlogSubsection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  variant?: "quote";
};

export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  subsections?: BlogSubsection[];
  cta?: { text: string; href: string };
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  whyItMatters?: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  sections: BlogSection[];
  relatedSlugs?: string[];
};
