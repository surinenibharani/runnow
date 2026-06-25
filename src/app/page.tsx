import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { CtaSection } from "@/components/landing/cta-section";
import { TipsTicker } from "@/components/landing/tips-ticker";
import { pageMetadata } from "@/lib/seo/metadata";
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  path: "/",
  titleAbsolute: true,
});

export default function Home() {
  return (
    <>
      <div className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-2.5 sm:px-6 text-center text-sm sm:text-base">
          <Link
            href="/blog/why-letsrunnow"
            className="inline-flex min-h-11 items-center justify-center font-medium text-primary hover:underline touch-target sm:min-h-0"
          >
            Why LetsRunNow?
          </Link>
          <span className="text-muted-foreground hidden sm:inline">
            {" "}
            — The anti-app app for new runners
          </span>
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
