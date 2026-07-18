import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PostContent } from "@/components/blog/post-content";
import { BlogScheduledPostNotice } from "@/components/blog/blog-scheduled-post-notice";
import { JsonLd } from "@/components/seo/json-ld";
import { getCommentCount } from "@/lib/blog/comment-counts";
import { getContentLikeStateForSession } from "@/lib/engagement/content-likes";
import { articleJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import {
  postOgImageMeta,
  seoTitle,
  truncateMetaDescription,
  twitterSiteMeta,
} from "@/lib/seo/metadata";
import { blogPostKeywords } from "@/lib/seo/keywords";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  blogPosts,
  getPostBySlug,
  getRelatedPosts,
  getVisiblePostBySlug,
  isBlogPostPublished,
} from "@/lib/blog/posts";
import {
  bootstrapBlogPreview,
  hasBlogPreviewAccess,
  isValidPreviewSecret,
} from "@/lib/blog/preview-server";
import {
  formatBlogPostPublishSchedule,
  isBlogPostScheduled,
} from "@/lib/blog/preview";
import { BlogPreviewBanner } from "@/components/blog/blog-preview-banner";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
};

export const revalidate = 3600;

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
  const preview =
    (await hasBlogPreviewAccess()) ||
    isValidPreviewSecret(previewToken);

  const visible = getVisiblePostBySlug(slug, preview);
  if (visible) {
    const scheduled = isBlogPostScheduled(visible.publishedAt);
    const url = `${SITE_URL}/blog/${slug}`;
    const title = visible.metaTitle ?? visible.title;
    const description = truncateMetaDescription(visible.excerpt);
    const fullTitle = seoTitle(title);
    const images = postOgImageMeta(slug, title);

    return {
      title,
      description,
      keywords: blogPostKeywords(slug, visible.category),
      authors: [{ name: visible.author }],
      ...(scheduled && preview
        ? { robots: { index: false, follow: false } }
        : {}),
      openGraph: {
        title: fullTitle,
        description,
        type: "article",
        publishedTime: visible.publishedAt,
        authors: [visible.author],
        url,
        siteName: SITE_NAME,
        images,
      },
      twitter: {
        card: "summary_large_image",
        ...twitterSiteMeta(),
        title: fullTitle,
        description,
        images: images.map((i) => i.url),
      },
      alternates: {
        canonical: url,
      },
    };
  }

  const scheduledPost = getPostBySlug(slug);
  if (scheduledPost && isBlogPostScheduled(scheduledPost.publishedAt)) {
    const when = formatBlogPostPublishSchedule(scheduledPost.publishedAt);
    const title = `${scheduledPost.title} — coming soon`;
    return {
      title,
      description: truncateMetaDescription(
        `This LetsRunNow article goes live on ${when}. ${scheduledPost.excerpt}`
      ),
      robots: { index: false, follow: true },
      alternates: {
        canonical: `${SITE_URL}/blog/${slug}`,
      },
    };
  }

  return {
    title: "Post Not Found",
    description: "This blog post could not be found on LetsRunNow.",
    robots: { index: false, follow: false },
  };
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { preview: previewToken } = await searchParams;
  const preview = await bootstrapBlogPreview(previewToken, `/blog/${slug}`);
  const post = getVisiblePostBySlug(slug, preview);

  if (!post) {
    const upcoming = getPostBySlug(slug);
    if (upcoming && isBlogPostScheduled(upcoming.publishedAt)) {
      return (
        <div className="py-12 sm:py-16">
          <FadeIn>
            <BlogScheduledPostNotice
              title={upcoming.title}
              category={upcoming.category}
              excerpt={upcoming.excerpt}
              publishSchedule={formatBlogPostPublishSchedule(
                upcoming.publishedAt
              )}
            />
          </FadeIn>
        </div>
      );
    }
    notFound();
  }

  const scheduled = isBlogPostScheduled(post.publishedAt);
  const related = getRelatedPosts(post, preview);
  const commentCount = await getCommentCount(slug);
  const likeState = await getContentLikeStateForSession("blog", slug);

  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
          ...(post.faq?.length
            ? [faqPageJsonLd(post.faq, `${SITE_URL}/blog/${slug}`)]
            : []),
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <FadeIn>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
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
            likeCount={likeState.count}
            likedByMe={likeState.liked}
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
