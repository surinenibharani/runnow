import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { TipsSectionNav } from "@/components/tips/tips-section-nav";
import { SituationalTipsGrid } from "@/components/tips/situational-tips-grid";
import { SpecificSituationsTipsPageHero } from "@/components/visuals/content-scenes";
import { HubNextSteps } from "@/components/content/hub-next-steps";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";
import { SITUATIONAL_SEO_KEYWORDS, TIPS_SEO_KEYWORDS } from "@/lib/seo/keywords";
import { situationalTipsToFaq } from "@/lib/tips/helpers";
import { SITE_URL } from "@/lib/site";
import type { PathwayLink } from "@/lib/content-pathways";

const situationNextSteps: PathwayLink[] = [
  {
    kind: "blog",
    href: "/blog/running-with-health-conditions",
    label: "Health-conditions guide",
    detail: "Clearance, pacing, and when a plan should wait.",
  },
  {
    kind: "injury",
    href: "/injuries",
    label: "Injury prevention",
    detail: "If pain is the issue, start here instead of pushing volume.",
  },
  {
    kind: "plan",
    href: "/start",
    label: "Get a gentler plan",
    detail: "The quiz can route you to walk-first if that's the right ramp.",
  },
];

const TITLE = "Running for Pregnancy, 55+, & Health Conditions";
const DESCRIPTION =
  "Beginner running guidance for pregnancy, runners 55+, diabetes, asthma, arthritis, and more — when to get clearance and how to start safely.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/tips/specific-situations",
  keywords: [...SITUATIONAL_SEO_KEYWORDS, ...TIPS_SEO_KEYWORDS.slice(0, 3)],
});

export default function SpecificSituationsTipsPage() {
  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: TITLE,
            description: DESCRIPTION,
            path: "/tips/specific-situations",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tips", path: "/tips" },
            { name: "Specific situations", path: "/tips/specific-situations" },
          ]),
          faqPageJsonLd(
            situationalTipsToFaq(),
            `${SITE_URL}/tips/specific-situations`
          ),
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tips", href: "/tips" },
            { label: "Specific situations" },
          ]}
        />
        <TipsSectionNav />

        <FadeIn className="mb-12">
          <SpecificSituationsTipsPageHero className="mb-8" />
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Running for specific situations
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Extra guidance for pregnancy, older runners, and common health
              conditions. Always defer to your doctor when advice conflicts with a
              training plan.
            </p>
          </div>
        </FadeIn>

        <SituationalTipsGrid />

        <FadeIn className="mt-10">
          <HubNextSteps steps={situationNextSteps} />
        </FadeIn>

        <FadeIn className="mt-8">
          <StartPlanCta
            variant="compact"
            headline="Clearance first, then a plan"
            description="A short quiz recommends a free beginner schedule — always defer to your clinician."
          />
        </FadeIn>
      </div>
    </div>
  );
}
