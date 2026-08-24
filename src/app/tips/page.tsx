import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { TipCard } from "@/components/tips/tip-card";
import { TipsGuideLink } from "@/components/tips/tips-guide-link";
import { TipsSectionNav } from "@/components/tips/tips-section-nav";
import { BeginnerRoadmap } from "@/components/content/beginner-roadmap";
import { HubNextSteps } from "@/components/content/hub-next-steps";
import { HubEditorialBlock } from "@/components/content/hub-editorial";
import { MedicalDisclaimerBanner } from "@/components/legal/medical-disclaimer-banner";
import { TipsPageHero } from "@/components/visuals/content-scenes";
import { getPublishedPostBySlug } from "@/lib/blog/posts";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
  itemListJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";
import { TIPS_SEO_KEYWORDS } from "@/lib/seo/keywords";
import { runnerTips, tipsPageGuides } from "@/lib/tips/tips";
import { tipHubSections, tipsForHubSection } from "@/lib/tips/hub";
import { tipsHubEditorial } from "@/lib/hub-seo";
import { beginnerRoadmapHowToSteps } from "@/lib/beginner-roadmap";
import { SITE_URL } from "@/lib/site";
import { tipsHubNextSteps } from "@/lib/content-pathways";

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
          itemListJsonLd({
            name: "Beginner running tips",
            path: "/tips",
            items: runnerTips.map((tip) => ({
              name: tip.title,
              path: `/tips/${tip.slug}`,
            })),
          }),
          faqPageJsonLd(tipsHubEditorial.faqs, `${SITE_URL}/tips`),
          howToJsonLd({
            name: tipsHubEditorial.howTo.name,
            description: tipsHubEditorial.howTo.description,
            path: "/tips",
            steps: tipsHubEditorial.howTo.steps,
          }),
          howToJsonLd({
            name: "Beginner running roadmap: week 1 to first 5K",
            description:
              "Show up three times, protect the habit, jog continuously, then finish a 5K without racing it.",
            path: "/tips",
            steps: beginnerRoadmapHowToSteps(),
          }),
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tips" }]} />
        <TipsSectionNav />

        <FadeIn className="mb-10">
          <TipsPageHero className="mb-8" />
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Tips for new runners
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Short, practical notes — grouped so you can grab what you need
              and keep moving.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mb-10">
          <BeginnerRoadmap />
        </FadeIn>

        <FadeIn className="mb-8">
          <nav
            aria-label="Tip topics"
            className="flex flex-wrap justify-center gap-2"
          >
            {tipHubSections.map((section) => (
              <Link
                key={section.id}
                href={`/tips#${section.id}`}
                className="inline-flex min-h-11 items-center rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {section.title}
              </Link>
            ))}
          </nav>
        </FadeIn>

        <FadeIn className="mb-8">
          <MedicalDisclaimerBanner />
        </FadeIn>

        <HubEditorialBlock editorial={tipsHubEditorial} />

        {tipHubSections.map((section) => {
          const tips = tipsForHubSection(section);
          if (tips.length === 0) return null;

          return (
            <section
              key={section.id}
              id={section.id}
              className="hub-section mb-14 scroll-mt-24"
            >
              <div className="mb-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                      <Link
                        href={`/tips#${section.id}`}
                        className="hover:text-primary hover:underline"
                      >
                        {section.title}
                      </Link>
                    </h2>
                    <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {section.summary}
                    </p>
                  </div>
                  <Link
                    href={section.nextHref}
                    className="shrink-0 text-sm font-medium text-primary hover:underline"
                  >
                    {section.nextLabel}
                  </Link>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {tips.map((tip) => {
                  const post = tip.blogSlug
                    ? getPublishedPostBySlug(tip.blogSlug)
                    : undefined;
                  return (
                    <TipCard
                      key={tip.slug}
                      id={tip.slug}
                      tipHref={`/tips/${tip.slug}`}
                      illustration={tip.illustration}
                      icon={tip.icon}
                      category={tip.category}
                      title={tip.title}
                      content={tip.content}
                      blogSlug={post ? tip.blogSlug : undefined}
                      blogReadTime={post?.readTime}
                      compact
                    />
                  );
                })}
              </div>
            </section>
          );
        })}

        {tipsPageGuides.map((guide) => {
          const post = guide.blogSlug
            ? getPublishedPostBySlug(guide.blogSlug)
            : undefined;

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
              blogSlug={post ? guide.blogSlug : undefined}
              blogReadTime={post?.readTime}
            />
          );
        })}

        <FadeIn className="mt-4">
          <HubNextSteps steps={tipsHubNextSteps} />
        </FadeIn>

        <FadeIn className="mt-8">
          <StartPlanCta
            variant="compact"
            headline="Ready for a plan?"
            description="A short quiz recommends a free beginner schedule. No account, no app."
          />
        </FadeIn>
      </div>
    </div>
  );
}
