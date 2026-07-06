import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { TipCard } from "@/components/tips/tip-card";
import { TipsGuideLink } from "@/components/tips/tips-guide-link";
import { TipsSectionNav } from "@/components/tips/tips-section-nav";
import { TipsPageHero } from "@/components/visuals/content-scenes";
import { getPostBySlug } from "@/lib/blog/posts";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";
import { TIPS_SEO_KEYWORDS } from "@/lib/seo/keywords";
import { runnerTips, tipsPageGuides } from "@/lib/tips/tips";

const TIPS_TITLE = "Beginner Running Tips — Pace, Gear, Recovery & More";
const TIPS_DESCRIPTION =
  "Beginner running tips for couch to 5K starters: easy pace, shoes, hydration, rest days, and bad-weather alternatives — no app, no paywall.";

export const metadata: Metadata = pageMetadata({
  title: TIPS_TITLE,
  description: TIPS_DESCRIPTION,
  path: "/tips",
  keywords: [...TIPS_SEO_KEYWORDS],
});

export default function TipsPage() {
  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: TIPS_TITLE,
            description: TIPS_DESCRIPTION,
            path: "/tips",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tips", path: "/tips" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tips" }]} />
        <TipsSectionNav />

        <FadeIn className="mb-12">
          <TipsPageHero className="mb-8" />
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Tips for New Runners
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              The stuff nobody tells you when you&apos;re starting out.
              Bookmark this page and come back whenever you need a reminder.
            </p>
          </div>
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

        <FadeIn className="mt-8">
          <StartPlanCta variant="compact" />
        </FadeIn>
      </div>
    </div>
  );
}
