import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { PostContent } from "@/components/blog/post-content";
import {
  blogPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <FadeIn>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>

          <PostContent post={post} related={related} />

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
