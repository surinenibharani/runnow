import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, HeartHandshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WomenRunnersInjuriesPageHero } from "@/components/visuals/content-scenes";
import { WomenRunnerConcernsSection } from "@/components/injuries/women-runner-concerns-section";
import { womenRunnerOverwhelmedBox } from "@/lib/injuries/women-runner-concerns";
import { pageMetadata } from "@/lib/seo/metadata";
import { INJURIES_SEO_KEYWORDS } from "@/lib/seo/keywords";

export const metadata: Metadata = pageMetadata({
  title: "Running Injuries for Women — RED-S, Pelvic Floor & Postpartum",
  description:
    "RED-S, pelvic floor leakage, pregnancy return-to-run, menstrual cycle training, bone health, and breast support — prevention, recovery, and when to see a specialist.",
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
          <WomenRunnersInjuriesPageHero className="mb-8" />
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              For women runners
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Injury and health concerns that show up often in women&apos;s
              training — hormonal shifts, bone health, pelvic floor, pregnancy,
              and more. How to spot them early, what to do, and when to get help.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              Guidelines vary by country — follow your national screening advice
              for breast, cervical, and heart checks.
            </p>
          </div>
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
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
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

        <FadeIn className="mb-12">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex gap-4 p-6">
              <HeartHandshake className="mt-0.5 size-6 shrink-0 text-primary" />
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  {womenRunnerOverwhelmedBox.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {womenRunnerOverwhelmedBox.body}
                </p>
                <p className="mt-3 text-sm">
                  {womenRunnerOverwhelmedBox.links.map((link, index) => (
                    <span key={link.href}>
                      {index > 0 && " · "}
                      <Link
                        href={link.href}
                        className="font-medium text-primary hover:underline"
                      >
                        {link.label}
                      </Link>
                    </span>
                  ))}
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn className="text-center">
          <p className="text-sm text-muted-foreground">
            <Link href="/injuries" className="text-primary hover:underline">
              All running injuries
            </Link>
            {" · "}
            <Link href="/start" className="text-primary hover:underline">
              Start here
            </Link>
            {" · "}
            <Link href="/plan" className="text-primary hover:underline">
              Training plans
            </Link>
            {" · "}
            <Link href="/gear" className="text-primary hover:underline">
              Gear guide
            </Link>
            {" · "}
            <Link
              href="/blog/running-guide-for-women"
              className="text-primary hover:underline"
            >
              Women&apos;s running guide
            </Link>
            {" · "}
            <Link
              href="/tips/specific-situations"
              className="text-primary hover:underline"
            >
              Pregnancy & health tips
            </Link>
            {" · "}
            <Link
              href="/injuries/for-men-runners"
              className="text-primary hover:underline"
            >
              Men runner health
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
