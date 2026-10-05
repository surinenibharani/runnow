import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { CtaSection } from "@/components/landing/cta-section";
import { TipsTicker } from "@/components/landing/tips-ticker";
import { StickyStartHere } from "@/components/landing/sticky-start-here";
import { BeginnerRoadmap } from "@/components/content/beginner-roadmap";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { howToJsonLd } from "@/lib/seo";
import { beginnerRoadmapHowToSteps } from "@/lib/beginner-roadmap";
import { HOME_SEO_KEYWORDS } from "@/lib/seo/keywords";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description:
    "Beginner-friendly running plans — never ran, coming back, or chasing a 5K, 10K, half, or marathon. Walk-run is allowed. Tips, injury prevention, and how to get better, in your browser. No app required.",
  path: "/",
  titleAbsolute: true,
  keywords: [...HOME_SEO_KEYWORDS],
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={howToJsonLd({
          name: "Beginner running roadmap: week 1 to first 5K — and the next distance",
          description:
            "Show up three times, protect the habit, jog continuously, finish a 5K, then pick the next honest goal or a comeback block.",
          path: "/",
          steps: beginnerRoadmapHowToSteps(),
        })}
      />
      <div className="overflow-x-clip border-b border-border/60 bg-muted/30">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-sm sm:px-6">
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
            className="inline-flex min-h-11 max-w-full items-center justify-center px-1 font-medium text-primary hover:underline touch-target sm:min-h-0"
          >
            Situational tips
          </Link>
        </div>
      </div>
      <TipsTicker />
      <Hero />
      <Features />
      <HowItWorks />
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <BeginnerRoadmap />
      </div>
      <Testimonials />
      <CtaSection />
      <StickyStartHere />
    </>
  );
}
