import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FadeIn } from "@/components/motion/fade-in";
import { OnboardingQuiz } from "@/components/tools/onboarding-quiz";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";

const PAGE_TITLE = "Start Here — Find Your Beginner Running Plan";
const PAGE_DESCRIPTION =
  "Answer a short quiz about experience, fitness, goals, schedule, and recovery needs — we'll recommend a free LetsRunNow training plan.";

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
            A short quiz about your experience, fitness, goal, and health
            context — then a plan that fits, free in your browser.
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
          </p>
        </FadeIn>

        <FadeIn>
          <OnboardingQuiz />
        </FadeIn>
      </div>
    </div>
  );
}
