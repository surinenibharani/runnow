import type { Metadata } from "next";
import { Clock, User } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { JsonLd } from "@/components/seo/json-ld";
import { blogIndexJsonLd } from "@/lib/seo";
import { blogPosts } from "@/lib/blog/posts";
import { pageMetadata } from "@/lib/seo/metadata";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Running Blog",
  description:
    "Beginner-friendly articles on training, nutrition, recovery, and mindset — written for runners starting from zero.",
  path: "/blog",
});

const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export default function BlogPage() {
  return (
    <div className="py-12 sm:py-16">
      <JsonLd data={blogIndexJsonLd(blogPosts.length)} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <FadeIn className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The {SITE_NAME} Blog
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Practical guides for beginners — from your first jog to your first
            marathon. Written by runners who remember what day one felt like.
          </p>
        </FadeIn>

        <StaggerChildren className="space-y-4">
          {sortedPosts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <Card className="border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="size-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors sm:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <User className="size-3.5" />
                        {post.author}
                      </span>
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            Ready to put it into practice?{" "}
            <Link href="/plan" className="text-primary hover:underline">
              Pick a training plan
            </Link>
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
