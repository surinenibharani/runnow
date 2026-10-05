import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FadeIn } from "@/components/motion/fade-in";
import { OnboardingQuiz } from "@/components/tools/onboarding-quiz";
import { BeginnerRoadmap } from "@/components/content/beginner-roadmap";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, howToJsonLd, webPageJsonLd } from "@/lib/seo";
import { beginnerRoadmapHowToSteps } from "@/lib/beginner-roadmap";
import { pageMetadata } from "@/lib/seo/metadata";

const PAGE_TITLE = "Start Here — Find Your Beginner-Friendly Running Plan";
const PAGE_DESCRIPTION =
  "Answer a short quiz about experience, fitness, goals, schedule, and recovery — we'll recommend a free beginner-friendly LetsRunNow plan. First-timers, comebacks, and experienced runners are all welcome.";

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/start",
});

export default function StartPage() {
  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
            path: "/start",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Start here", path: "/start" },
          ]),
          howToJsonLd({
            name: "Beginner running roadmap: week 1 to first 5K — and beyond",
            description: PAGE_DESCRIPTION,
            path: "/start",
            steps: beginnerRoadmapHowToSteps(),
          }),
        ]}
      />
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Start here" }]}
        />

        <FadeIn className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Start here
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Don&apos;t know where to start? Answer a short quiz — then get a
            free beginner-friendly plan that fits, whether you have never run,
            you are coming back, or you already have a base. Walk-run is
            allowed.
          </p>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            Already know your distance?{" "}
            <Link href="/plan" className="text-primary hover:underline">
              Browse all plans
            </Link>
            {" · "}
            <Link href="/tools" className="text-primary hover:underline">
              Running tools
            </Link>
            {" · "}
            <Link href="/stories" className="text-primary hover:underline">
              Success stories
            </Link>
          </p>
        </FadeIn>

        <FadeIn className="mb-8">
          <BeginnerRoadmap heading="Beginner roadmap" />
        </FadeIn>

        <FadeIn>
          <OnboardingQuiz />
        </FadeIn>
      </div>
    </div>
  );
}
