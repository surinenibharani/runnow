export type BlogSubsection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  subsections?: BlogSubsection[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  sections: BlogSection[];
  relatedSlugs?: string[];
};
