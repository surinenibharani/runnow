import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

        <FadeIn className="mb-10">
          <Card className="border-violet-500/20 bg-violet-500/[0.03] hover:shadow-md transition-shadow duration-300">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-700 dark:text-violet-300">
                  <BookOpen className="size-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    Women&apos;s running guide
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-xl">
                    Sports bras, training through your cycle, bone health, and
                    when to get clearance — practical advice for women starting
                    a running habit.
                  </p>
                </div>
              </div>
              <Button
                nativeButton={false}
                render={<Link href="/blog/running-guide-for-women" />}
                variant="outline"
                size="sm"
                className="shrink-0 border-violet-500/30 text-violet-700 hover:bg-violet-500/10 dark:text-violet-300"
              >
                Read guide
                <ArrowRight className="size-4" />
              </Button>
            </CardContent>
          </Card>
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
