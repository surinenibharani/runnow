import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WomenRunnerConcernsSection } from "@/components/injuries/women-runner-concerns-section";
import { pageMetadata } from "@/lib/seo/metadata";
import { INJURIES_SEO_KEYWORDS } from "@/lib/seo/keywords";

export const metadata: Metadata = pageMetadata({
  title: "Running Injuries for Women — RED-S, Pelvic Floor & Postpartum",
  description:
    "RED-S, pelvic floor leakage, and pregnancy return-to-run guidance for women runners — prevention, recovery, and when to see a specialist.",
  path: "/injuries/for-women-runners",
  keywords: [...INJURIES_SEO_KEYWORDS],
});

export default function ForWomenRunnersInjuriesPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Injuries", href: "/injuries" },
            { label: "For women runners" },
          ]}
        />

        <FadeIn className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            For women runners
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl">
            Injury and health concerns that show up often in women&apos;s
            training — how to spot them early, what to do, and when to get help.
          </p>
        </FadeIn>

        <WomenRunnerConcernsSection />

        <FadeIn className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            <Link href="/injuries" className="text-primary hover:underline">
              All running injuries
            </Link>
            {" · "}
            <Link href="/plan" className="text-primary hover:underline">
              View training plans
            </Link>
            {" · "}
            <Link
              href="/blog/running-guide-for-women"
              className="text-primary hover:underline"
            >
              Women&apos;s running guide
            </Link>
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <StartPlanCta variant="compact" />
        </FadeIn>
      </div>
    </div>
  );
}
