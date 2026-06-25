import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { TipCard } from "@/components/tips/tip-card";
import { TipsGuideLink } from "@/components/tips/tips-guide-link";
import { TipsSectionNav } from "@/components/tips/tips-section-nav";
import { getPostBySlug } from "@/lib/blog/posts";
import { pageMetadata } from "@/lib/seo/metadata";
import { runnerTips, tipsPageGuides } from "@/lib/tips/tips";

export const metadata: Metadata = pageMetadata({
  title: "Beginner Running Tips",
  description:
    "Practical advice for new runners — pacing, gear, recovery, bad-weather indoor alternatives, and guidance for pregnancy, runners 55+, and common health conditions.",
  path: "/tips",
});

export default function TipsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tips" }]} />
        <TipsSectionNav />

        <FadeIn className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tips for New Runners
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            The stuff nobody tells you when you&apos;re starting out.
            Bookmark this page and come back whenever you need a reminder.
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-5 sm:grid-cols-2">
          {runnerTips.map((tip) => {
            const post = tip.blogSlug ? getPostBySlug(tip.blogSlug) : undefined;

            return (
              <StaggerItem key={tip.slug}>
                <TipCard
                  id={tip.slug}
                  illustration={tip.illustration}
                  icon={tip.icon}
                  category={tip.category}
                  title={tip.title}
                  content={tip.content}
                  blogSlug={tip.blogSlug}
                  blogReadTime={post?.readTime}
                />
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        {tipsPageGuides.map((guide) => {
          const post = guide.blogSlug ? getPostBySlug(guide.blogSlug) : undefined;

          return (
            <TipsGuideLink
              key={guide.slug}
              id={guide.slug}
              href={guide.href}
              title={guide.title}
              description={guide.description}
              icon={guide.icon}
              iconClassName={guide.iconClassName}
              illustration={guide.illustration}
              blogSlug={guide.blogSlug}
              blogReadTime={post?.readTime}
            />
          );
        })}

        <FadeIn className="mt-10 text-center text-sm text-muted-foreground">
          <p>
            Dealing with pain from running? See our{" "}
            <Link href="/injuries" className="text-primary hover:underline">
              injury prevention guide
            </Link>{" "}
            or build a plan tuned to your age on the{" "}
            <Link href="/plan" className="text-primary hover:underline">
              training plans
            </Link>{" "}
            page. Many tips link to longer articles on the{" "}
            <Link href="/blog" className="text-primary hover:underline">
              blog
            </Link>
            .
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
