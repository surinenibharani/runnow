import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PostContent } from "@/components/blog/post-content";
import { JsonLd } from "@/components/seo/json-ld";
import { getCommentCount } from "@/lib/blog/comment-counts";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ogImageMeta } from "@/lib/seo/metadata";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  blogPosts,
  getRelatedPosts,
  getVisiblePostBySlug,
  isBlogPostPublished,
  resolveBlogPreview,
} from "@/lib/blog/posts";
import {
  formatBlogPostPublishSchedule,
  isBlogPostScheduled,
} from "@/lib/blog/preview";
import { BlogPreviewBanner } from "@/components/blog/blog-preview-banner";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return blogPosts
    .filter((post) => isBlogPostPublished(post.publishedAt))
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { preview: previewToken } = await searchParams;
  const preview = resolveBlogPreview(previewToken);
  const post = getVisiblePostBySlug(slug, preview);
  if (!post) {
    return {
      title: "Post Not Found",
      description: "This blog post could not be found on LetsRunNow.",
      robots: { index: false, follow: false },
    };
  }

  const scheduled = isBlogPostScheduled(post.publishedAt);
  const url = `${SITE_URL}/blog/${slug}`;
  const images = ogImageMeta();

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, "running", "beginner runner", SITE_NAME],
    authors: [{ name: post.author }],
    ...(scheduled && preview
      ? { robots: { index: false, follow: false } }
      : {}),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      url,
      siteName: SITE_NAME,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: images.map((i) => i.url),
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { preview: previewToken } = await searchParams;
  const preview = resolveBlogPreview(previewToken);
  const post = getVisiblePostBySlug(slug, preview);
  if (!post) notFound();

  const scheduled = isBlogPostScheduled(post.publishedAt);
  const related = getRelatedPosts(post, preview);
  const commentCount = await getCommentCount(slug);
  const previewSuffix =
    preview && previewToken
      ? `?preview=${encodeURIComponent(previewToken)}`
      : "";

  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: `/blog${previewSuffix}` },
            { name: post.title, path: `/blog/${slug}${previewSuffix}` },
          ]),
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <FadeIn>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: `/blog${previewSuffix}` },
              { label: post.title },
            ]}
          />

          {preview && scheduled && (
            <BlogPreviewBanner
              publishSchedule={formatBlogPostPublishSchedule(post.publishedAt)}
            />
          )}

          <PostContent
            post={post}
            related={related}
            commentCount={commentCount}
            previewToken={preview ? previewToken : undefined}
            scheduled={preview && scheduled}
          />

          {slug === "avoiding-injuries" && (
            <p className="mt-8 text-sm text-muted-foreground">
              <Link href="/injuries" className="text-primary hover:underline">
                View our full injury prevention guide →
              </Link>
            </p>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
