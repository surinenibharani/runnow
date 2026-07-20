import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";
import { SITE_NAME } from "@/lib/site";

const TITLE = `About ${SITE_NAME}`;
const DESCRIPTION =
  "LetsRunNow helps beginners start running with free browser-based training plans, practical tips, and optional Strava sync — no app download required.";

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
            We built {SITE_NAME} for people who want to start running without
            downloading another app, paying for a coach on day one, or feeling
            talked down to.
          </p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                What we offer
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Free couch-to-5K through marathon plans you can track in the
                  browser
                </li>
                <li>
                  Beginner guides on gear, injuries, recovery, nutrition, and
                  mindset
                </li>
                <li>
                  Optional Strava sync and a dashboard when you create an
                  account
                </li>
                <li>
                  Practical tools — pace calculator, race predictor, and a shoe
                  quiz
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                How we think about training
              </h2>
              <p className="mt-3">
                Walk-run intervals count. Easy days matter. Consistency beats
                hero workouts. Our content is educational — not medical advice —
                and we cite sources when we make health claims.
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
