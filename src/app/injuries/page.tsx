import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { CommonInjuryCard } from "@/components/injuries/common-injury-card";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { InjuriesPageHero } from "@/components/visuals/content-scenes";
import {
  commonInjuries,
  preventionPrinciples,
} from "@/lib/injuries/common-injuries";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";
import { INJURIES_SEO_KEYWORDS } from "@/lib/seo/keywords";
import { MedicalDisclaimerText } from "@/components/legal/medical-disclaimer-text";
import { cn } from "@/lib/utils";

const INJURIES_TITLE =
  "Common Running Injuries — Prevention & Recovery for Beginners";
const INJURIES_DESCRIPTION =
  "Shin splints, runner's knee, IT band pain, and plantar fasciitis — how beginners can prevent, recover from, and avoid common running injuries.";

export const metadata: Metadata = pageMetadata({
  title: INJURIES_TITLE,
  description: INJURIES_DESCRIPTION,
  path: "/injuries",
  keywords: [...INJURIES_SEO_KEYWORDS],
});

export default function InjuriesPage() {
  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: INJURIES_TITLE,
            description: INJURIES_DESCRIPTION,
            path: "/injuries",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Injuries", path: "/injuries" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Injuries" }]}
          />
          <div className="flex flex-wrap gap-2">
            <Button
              nativeButton={false}
              render={<Link href="/injuries/for-women-runners" />}
              variant="outline"
              size="sm"
              className="border-violet-500/30 text-violet-700 hover:bg-violet-500/10 dark:text-violet-300"
            >
              Women runner injuries
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/injuries/for-men-runners" />}
              variant="outline"
              size="sm"
              className="border-sky-500/30 text-sky-700 hover:bg-sky-500/10 dark:text-sky-300"
            >
              Men runner injuries
            </Button>
          </div>
        </div>

        <FadeIn className="mb-12">
          <InjuriesPageHero className="mb-8" />
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Common Running Injuries
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              How to avoid them, how to recover, and when to get help.
              Prevention beats rehab every time.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mb-10">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex gap-4 p-6">
              <Stethoscope className="mt-0.5 size-6 shrink-0 text-primary" />
              <div className="text-sm leading-relaxed">
                <p>
                  <MedicalDisclaimerText>
                    This page is educational, not medical advice.
                  </MedicalDisclaimerText>
                </p>
                <p className="mt-1 text-muted-foreground">
                  Sharp pain, swelling, numbness, or pain that worsens over days
                  warrants a visit to a doctor or sports physiotherapist. When in
                  doubt, rest and get checked out.
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn className="mb-12">
          <h2 className="mb-4 text-xl font-bold">Universal prevention habits</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {preventionPrinciples.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <Shield className="mt-0.5 size-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn className="mb-6">
          <h2 className="text-xl font-bold">Common injuries (all runners)</h2>
        </FadeIn>

        <FadeIn className="mb-8">
          <nav
            aria-label="Common running injuries"
            className="flex flex-wrap justify-center gap-2"
          >
            {commonInjuries.map((injury) => (
              <a
                key={injury.slug}
                href={`#${injury.slug}`}
                className={cn(
                  "inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10"
                )}
              >
                {injury.title}
              </a>
            ))}
          </nav>
        </FadeIn>

        <StaggerChildren className="mb-12 space-y-6">
          {commonInjuries.map((injury) => (
            <StaggerItem key={injury.slug}>
              <CommonInjuryCard injury={injury} linkTitle showShare />
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn className="text-center">
          <p className="text-sm text-muted-foreground">
            Stay healthy with a structured plan and built-in rest days. Don&apos;t
            know where to start?{" "}
            <Link href="/start" className="text-primary hover:underline">
              Start here
            </Link>
            {" · "}
            <Link href="/plan" className="text-primary hover:underline">
              Training plans
            </Link>
            {" · "}
            <Link href="/tips" className="text-primary hover:underline">
              Beginner tips
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
              href="/blog/running-guide-for-men"
              className="text-primary hover:underline"
            >
              Men&apos;s running guide
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
