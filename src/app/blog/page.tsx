import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import {
  BlogCategoryFilter,
} from "@/components/blog/blog-category-filter";
import { BlogFilteredPosts } from "@/components/blog/blog-filtered-posts";
import { JsonLd } from "@/components/seo/json-ld";
import { getCommentCountsBySlug } from "@/lib/blog/comment-counts";
import {
  getVisibleBlogPostCards,
} from "@/lib/blog/posts";
import { buildBlogCategories } from "@/lib/blog/categories";
import { bootstrapBlogPreview, hasBlogPreviewAccess, isValidPreviewSecret } from "@/lib/blog/preview-server";
import { isBlogPostScheduled } from "@/lib/blog/preview";
import { BlogPreviewBanner } from "@/components/blog/blog-preview-banner";
import { BlogPageHero } from "@/components/visuals/content-scenes";
import { blogIndexJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";
import { BLOG_SEO_KEYWORDS } from "@/lib/seo/keywords";
import { SITE_NAME } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Beginner Running Blog — Couch to 5K Tips & Training Advice",
  description:
    "Beginner running blog with couch to 5K tips, pacing, gear, injury prevention, and mindset — practical articles for first-time runners, no jargon.",
  path: "/blog",
  keywords: [...BLOG_SEO_KEYWORDS],
});

type BlogPageProps = {
  searchParams: Promise<{ category?: string; preview?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category: categoryParam, preview: previewToken } = await searchParams;
  const categoryQuery = categoryParam
    ? `?category=${encodeURIComponent(categoryParam)}`
    : "";
  const preview = await bootstrapBlogPreview(
    previewToken,
    `/blog${categoryQuery}`
  );
  const cardPosts = getVisibleBlogPostCards(preview);
  const categories = buildBlogCategories(cardPosts.map((p) => p.category));
  const scheduledCount = preview
    ? cardPosts.filter((post) => isBlogPostScheduled(post.publishedAt)).length
    : 0;
  const commentCounts = await getCommentCountsBySlug();

  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          blogIndexJsonLd(
            cardPosts.map((post) => ({
              title: post.title,
              slug: post.slug,
              excerpt: post.excerpt,
            }))
          ),
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

        <FadeIn className="mb-10">
          <BlogPageHero className="mb-8" />
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The {SITE_NAME} Blog
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Practical guides for beginners — from your first jog to your first
              marathon. Written by runners who remember what day one felt like.
              Don&apos;t know where to start?{" "}
              <Link href="/start" className="font-medium text-primary hover:underline">
                Start here
              </Link>
              .
            </p>
          </div>
        </FadeIn>

        <Suspense fallback={null}>
          <BlogCategoryFilter categories={categories} className="mb-10" />
        </Suspense>

        {preview && scheduledCount > 0 && (
          <BlogPreviewBanner scheduledCount={scheduledCount} />
        )}

        <Suspense fallback={null}>
          <BlogFilteredPosts
            posts={cardPosts}
            commentCounts={commentCounts}
          />
        </Suspense>

        <FadeIn className="mt-12">
          <StartPlanCta variant="compact" />
        </FadeIn>
      </div>
    </div>
  );
}
