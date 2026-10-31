import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { MedicalDisclaimerBanner } from "@/components/legal/medical-disclaimer-banner";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";
import { SITE_NAME } from "@/lib/site";

const TITLE = `About ${SITE_NAME}`;
const DESCRIPTION =
  "LetsRunNow is beginner-friendly running help for every level — never ran, coming back from a break, or training for a 5K through a marathon — with free browser-based plans, tips, and injury guides. No app required.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: TITLE,
            description: DESCRIPTION,
            path: "/about",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "About" }]}
        />

        <FadeIn className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About {SITE_NAME}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            We built {SITE_NAME} to be beginner-friendly: walk-run is allowed,
            and nobody talks down to you. That includes first-timers, returning
            runners, mid-level racers, and experienced athletes who still want a
            clear week — without downloading another app or paying for a coach
            on day one.
          </p>

          <div className="mt-8">
            <MedicalDisclaimerBanner />
          </div>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                What we offer
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Free beginner-friendly walk-to-5K through marathon plans you
                  can track in the browser — first-timers, comebacks, and
                  runners with a base
                </li>
                <li>
                  Guides on gear, injuries (prevent and recover), sleep,
                  strength, nutrition, and mindset — for all ages and genders
                </li>
                <li>
                  Optional Strava sync and a dashboard when you create an
                  account
                </li>
                <li>
                  Practical tools — pace calculator, race predictor, and a shoe
                  quiz
                </li>
                <li>
                  Health claims cite Mayo Clinic, CDC, NHS, ACSM, AHA, ACOG,
                  PubMed, and peer-reviewed journals. Content is educational —
                  not medical advice
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                How we think about training
              </h2>
              <p className="mt-3">
                Walk-run intervals count. Easy days matter. Consistency beats
                hero workouts. The same load-management rules help a first 5K
                and a marathon peak. Our content is educational — not medical
                advice — and we cite trusted medical and sports-science sources
                when we make health claims.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Why free plans?
              </h2>
              <p className="mt-3">
                Getting started should not require a subscription. Paid coach
                tools exist for people who want more structure later; the core
                plans and guides stay free.
              </p>
            </section>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button nativeButton={false} render={<Link href="/start" />}>
              Start here
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/contact" />}
              variant="outline"
            >
              Contact us
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
