import type { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { CtaSection } from "@/components/landing/cta-section";
import { pageMetadata } from "@/lib/seo/metadata";
import { SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `LetsRunNow — ${SITE_TAGLINE}`,
  description:
    "Your friendly guide to becoming a runner. Free 5K, half marathon, and marathon plans with progress tracking.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CtaSection />
    </>
  );
}
