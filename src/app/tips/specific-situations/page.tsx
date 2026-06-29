import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Users } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { TipsSectionNav } from "@/components/tips/tips-section-nav";
import { SituationalTipsGrid } from "@/components/tips/situational-tips-grid";
import { pageMetadata } from "@/lib/seo/metadata";
import { SITUATIONAL_SEO_KEYWORDS, TIPS_SEO_KEYWORDS } from "@/lib/seo/keywords";

export const metadata: Metadata = pageMetadata({
  title: "Running for Pregnancy, 55+, & Health Conditions",
  description:
    "Beginner running guidance for pregnancy, runners 55+, diabetes, asthma, arthritis, and more — when to get clearance and how to start safely.",
  path: "/tips/specific-situations",
  keywords: [...SITUATIONAL_SEO_KEYWORDS, ...TIPS_SEO_KEYWORDS.slice(0, 3)],
});

export default function SpecificSituationsTipsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tips", href: "/tips" },
            { label: "Specific situations" },
          ]}
        />
        <TipsSectionNav />

        <FadeIn className="text-center mb-12">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
            <Users className="size-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Running for specific situations
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Extra guidance for pregnancy, older runners, and common health
            conditions. Always defer to your doctor when advice conflicts with a
            training plan.
          </p>
        </FadeIn>

        <SituationalTipsGrid />

        <FadeIn className="mt-10 text-center text-sm text-muted-foreground">
          <p>
            Dealing with pain from running? See our{" "}
            <Link href="/injuries" className="text-primary hover:underline">
              injury prevention guide
            </Link>
            . For a longer read on medical considerations, see{" "}
            <Link
              href="/blog/running-with-health-conditions"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <BookOpen className="size-3.5" />
              running with health conditions
            </Link>
            .
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
