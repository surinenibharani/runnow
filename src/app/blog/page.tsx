import type { Metadata } from "next";
import { Suspense } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import {
  BlogCategoryFilter,
} from "@/components/blog/blog-category-filter";
import { BlogPostCards } from "@/components/blog/blog-post-cards";
import { JsonLd } from "@/components/seo/json-ld";
import { filterPostsByCategory, paramToCategory } from "@/lib/blog/categories";
import { getCommentCountsBySlug } from "@/lib/blog/comment-counts";
import {
  getVisibleBlogPosts,
} from "@/lib/blog/posts";
import { bootstrapBlogPreview, hasBlogPreviewAccess, isValidPreviewSecret } from "@/lib/blog/preview-server";
import { isBlogPostScheduled } from "@/lib/blog/preview";
import { BlogPreviewBanner } from "@/components/blog/blog-preview-banner";
import { BlogPageHero } from "@/components/visuals/content-scenes";
import { blogIndexJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";
import { BLOG_SEO_KEYWORDS } from "@/lib/seo/keywords";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-dynamic";

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
  const sortedPosts = getVisibleBlogPosts(preview);
  const scheduledCount = preview
    ? sortedPosts.filter((post) => isBlogPostScheduled(post.publishedAt)).length
    : 0;
  const commentCounts = await getCommentCountsBySlug();
  const activeCategory = paramToCategory(categoryParam);
  const filteredPosts = filterPostsByCategory(sortedPosts, categoryParam);

  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          blogIndexJsonLd(
            sortedPosts.map((post) => ({
              title: post.metaTitle ?? post.title,
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
            </p>
          </div>
        </FadeIn>

        <Suspense fallback={null}>
          <BlogCategoryFilter className="mb-10" />
        </Suspense>

        {preview && scheduledCount > 0 && (
          <BlogPreviewBanner scheduledCount={scheduledCount} />
        )}

        {activeCategory && (
          <FadeIn className="mb-6 text-center text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">{activeCategory}</span>{" "}
            · {filteredPosts.length} article
            {filteredPosts.length === 1 ? "" : "s"}
          </FadeIn>
        )}

        <BlogPostCards
          posts={filteredPosts}
          commentCounts={commentCounts}
        />

        <FadeIn className="mt-12">
          <StartPlanCta variant="compact" />
        </FadeIn>
      </div>
    </div>
  );
}
