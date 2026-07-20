import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { TipsSectionNav } from "@/components/tips/tips-section-nav";
import { WeatherTipsGrid } from "@/components/tips/weather-tips-grid";
import { MedicalDisclaimerBanner } from "@/components/legal/medical-disclaimer-banner";
import { BadWeatherTipsPageHero } from "@/components/visuals/content-scenes";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";
import { BAD_WEATHER_SEO_KEYWORDS, TIPS_SEO_KEYWORDS } from "@/lib/seo/keywords";
import { weatherTipsToFaq } from "@/lib/tips/helpers";
import { SITE_URL } from "@/lib/site";

const TITLE = "Running in Bad Weather — Rain, Heat, Ice & Indoor Swaps";
const DESCRIPTION =
  "Bad weather running tips for beginners: when to run in rain or heat, when to stay in, and indoor cross-training swaps so your couch to 5K plan stays on track.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/tips/bad-weather",
  keywords: [...BAD_WEATHER_SEO_KEYWORDS, ...TIPS_SEO_KEYWORDS.slice(0, 3)],
});

export default function BadWeatherTipsPage() {
  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: TITLE,
            description: DESCRIPTION,
            path: "/tips/bad-weather",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tips", path: "/tips" },
            { name: "Bad weather", path: "/tips/bad-weather" },
          ]),
          faqPageJsonLd(
            weatherTipsToFaq(),
            `${SITE_URL}/tips/bad-weather`
          ),
        ]}
      />
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

        <FadeIn className="mb-8">
          <MedicalDisclaimerBanner>
            Extreme heat, cold, or poor air quality carry real health risks —
            when in doubt, move your run indoors.{" "}
          </MedicalDisclaimerBanner>
        </FadeIn>

        <WeatherTipsGrid />

        <FadeIn className="mt-10 text-center text-sm text-muted-foreground">
          <p>
            Don&apos;t know where to start?{" "}
            <Link href="/start" className="text-primary hover:underline">
              Start here
            </Link>
            . Need a structured plan for rest and cross-training days?{" "}
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
