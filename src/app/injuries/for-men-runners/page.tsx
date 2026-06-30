import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, HeartHandshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { MenRunnersInjuriesPageHero } from "@/components/visuals/content-scenes";
import { MenRunnerConcernsSection } from "@/components/injuries/men-runner-concerns-section";
import { menRunnerOverwhelmedBox } from "@/lib/injuries/men-runner-concerns";
import { pageMetadata } from "@/lib/seo/metadata";
import { INJURIES_SEO_KEYWORDS } from "@/lib/seo/keywords";

export const metadata: Metadata = pageMetadata({
  title: "Running Injuries for Men — Heart, RED-S, Groin & Overtraining",
  description:
    "RED-S in men, chest pain while running, groin and sports hernia, overtraining, prostate and urinary symptoms, heat hydration, and mental health — prevention, recovery, and when to see a specialist.",
  path: "/injuries/for-men-runners",
  keywords: [...INJURIES_SEO_KEYWORDS],
});

export default function ForMenRunnersInjuriesPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Injuries", href: "/injuries" },
            { label: "For men runners" },
          ]}
        />

        <FadeIn className="mb-12">
          <MenRunnersInjuriesPageHero className="mb-8" />
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              For men runners
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Injury and health concerns that show up often in men&apos;s
              training — heart symptoms, under-fueling, groin issues, overtraining,
              and more. How to spot them early, what to do, and when to get help.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              Guidelines vary by country — follow your national screening advice
              for breast, prostate, and heart checks.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mb-10">
          <Card className="border-sky-500/20 bg-sky-500/[0.03] transition-shadow duration-300 hover:shadow-md">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-700 dark:text-sky-300">
                  <BookOpen className="size-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    Men&apos;s running guide
                  </h2>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Shoes, anti-chafe gear, fueling, heart awareness, groin
                    prevention, and training load — practical advice for men
                    starting a running habit.
                  </p>
                </div>
              </div>
              <Button
                nativeButton={false}
                render={<Link href="/blog/running-guide-for-men" />}
                variant="outline"
                size="sm"
                className="shrink-0 border-sky-500/30 text-sky-700 hover:bg-sky-500/10 dark:text-sky-300"
              >
                Read guide
                <ArrowRight className="size-4" />
              </Button>
            </CardContent>
          </Card>
        </FadeIn>

        <MenRunnerConcernsSection />

        <FadeIn className="mb-12">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex gap-4 p-6">
              <HeartHandshake className="mt-0.5 size-6 shrink-0 text-primary" />
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  {menRunnerOverwhelmedBox.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {menRunnerOverwhelmedBox.body}
                </p>
                <p className="mt-3 text-sm">
                  {menRunnerOverwhelmedBox.links.map((link, index) => (
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
            <Link href="/plan" className="text-primary hover:underline">
              Training plans
            </Link>
            {" · "}
            <Link href="/gear" className="text-primary hover:underline">
              Gear guide
            </Link>
            {" · "}
            <Link
              href="/blog/running-guide-for-men"
              className="text-primary hover:underline"
            >
              Men&apos;s running guide
            </Link>
            {" · "}
            <Link
              href="/injuries/for-women-runners"
              className="text-primary hover:underline"
            >
              Women runner health
            </Link>
            {" · "}
            <Link
              href="/tips/specific-situations"
              className="text-primary hover:underline"
            >
              Health & situation tips
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
