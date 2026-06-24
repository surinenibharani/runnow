import type { Metadata } from "next";
import Link from "next/link";
import { CloudRain } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { TipsBackLink } from "@/components/tips/tips-back-link";
import { WeatherTipsGrid } from "@/components/tips/weather-tips-grid";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Bad Weather Running Tips",
  description:
    "Weather-aware running tips and indoor alternatives for rain, heat, cold, storms, wind, and poor air quality.",
  path: "/tips/bad-weather",
});

export default function BadWeatherTipsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <TipsBackLink />

        <FadeIn className="text-center mb-12">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <CloudRain className="size-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Bad weather? Stay on track
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Weather-aware tips for when conditions aren&apos;t ideal — plus indoor
            alternatives so you keep moving without skipping your habit.
          </p>
        </FadeIn>

        <WeatherTipsGrid />

        <FadeIn className="mt-10 text-center text-sm text-muted-foreground">
          <p>
            Need a structured plan for rest and cross-training days?{" "}
            <Link href="/plan" className="text-primary hover:underline">
              Open your training plan
            </Link>
            .
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
