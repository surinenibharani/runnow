import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { CtaSection } from "@/components/landing/cta-section";
import { TipsTicker } from "@/components/landing/tips-ticker";
import { pageMetadata } from "@/lib/seo/metadata";
import { HOME_SEO_KEYWORDS } from "@/lib/seo/keywords";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description:
    "Free couch to 5K plan for beginners — 8-week running schedule in your browser, no app download. Half marathon and marathon plans, cross-training, and optional Strava sync.",
  path: "/",
  titleAbsolute: true,
  keywords: [...HOME_SEO_KEYWORDS],
});

export default function Home() {
  return (
    <>
      <div className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 px-4 py-2.5 sm:flex-row sm:gap-3 sm:px-6 text-center text-sm sm:text-base">
          <Link
            href="/blog/why-letsrunnow"
            className="inline-flex min-h-11 items-center justify-center font-medium text-primary hover:underline touch-target sm:min-h-0"
          >
            Why LetsRunNow?
          </Link>
          <span className="hidden text-muted-foreground sm:inline" aria-hidden>
            ·
          </span>
          <Link
            href="/tips/specific-situations"
            className="inline-flex min-h-11 items-center justify-center font-medium text-primary hover:underline touch-target sm:min-h-0"
          >
            Pregnancy, 55+, health conditions — situational tips
          </Link>
        </div>
      </div>
      <TipsTicker />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CtaSection />
    </>
  );
}
