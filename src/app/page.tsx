import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { CtaSection } from "@/components/landing/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { howToJsonLd } from "@/lib/seo";
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
          name: "How LetsRunNow works",
          description:
            "Get a free plan, follow the day's walk-run, and check it off in your browser.",
          path: "/",
          steps: [
            {
              name: "Get a plan",
              text: "A short quiz picks a free beginner-friendly schedule that fits your fitness.",
            },
            {
              name: "Follow the day",
              text: "Each workout says when to walk and when to jog. Slow is the point.",
            },
            {
              name: "Check it off",
              text: "Tap the circle when you finish. Your streak lives in the browser — no app.",
            },
          ],
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
        </div>
      </div>
      <Hero />
      <HowItWorks />
      <Testimonials />
      <CtaSection />
    </>
  );
}
