import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { TipsSectionNav } from "@/components/tips/tips-section-nav";
import { WeatherTipsGrid } from "@/components/tips/weather-tips-grid";
import { BadWeatherTipsPageHero } from "@/components/visuals/content-scenes";
import { pageMetadata } from "@/lib/seo/metadata";
import { BAD_WEATHER_SEO_KEYWORDS, TIPS_SEO_KEYWORDS } from "@/lib/seo/keywords";

export const metadata: Metadata = pageMetadata({
  title: "Running in Bad Weather — Rain, Heat, Ice & Indoor Swaps",
  description:
    "Bad weather running tips for beginners: when to run in rain or heat, when to stay in, and indoor cross-training swaps so your couch to 5K plan stays on track.",
  path: "/tips/bad-weather",
  keywords: [...BAD_WEATHER_SEO_KEYWORDS, ...TIPS_SEO_KEYWORDS.slice(0, 3)],
});

export default function BadWeatherTipsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tips", href: "/tips" },
            { label: "Bad weather" },
          ]}
        />
        <TipsSectionNav />

        <FadeIn className="mb-12">
          <BadWeatherTipsPageHero className="mb-8" />
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Bad weather? Stay on track
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Weather-aware tips for when conditions aren&apos;t ideal — plus indoor
              alternatives so you keep moving without skipping your habit.
            </p>
          </div>
        </FadeIn>

        <WeatherTipsGrid />

        <FadeIn className="mt-10 text-center text-sm text-muted-foreground">
          <p>
            Need a structured plan for rest and cross-training days?{" "}
            <Link href="/plan" className="text-primary hover:underline">
              Open your training plan
            </Link>
            . Want the full breakdown?{" "}
            <Link
              href="/blog/running-in-bad-weather"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <BookOpen className="size-3.5" />
              Read the bad-weather article
            </Link>
            .
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <StartPlanCta variant="compact" />
        </FadeIn>
      </div>
    </div>
  );
}
