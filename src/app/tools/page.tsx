import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Footprints, Timer } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";

const PAGE_TITLE = "Free Running Tools — Pace, Race Predictor & Shoe Quiz";
const PAGE_DESCRIPTION =
  "Free beginner running tools: pace calculator, Riegel race time predictor, and a short shoe quiz that points you to gear guidance.";

const TOOLS = [
  {
    href: "/tools/pace-calculator",
    title: "Pace calculator",
    description:
      "Turn distance and finish time into pace — or pace and distance into an estimated finish time.",
    icon: Timer,
  },
  {
    href: "/tools/race-predictor",
    title: "Race time predictor",
    description:
      "Use a known 5K, 10K, half, or marathon result to estimate another distance with the Riegel formula.",
    icon: Calculator,
  },
  {
    href: "/tools/shoe-quiz",
    title: "Shoe quiz",
    description:
      "Answer a few questions about mileage, surface, and cushion preference — get category guidance, not a hard sell.",
    icon: Footprints,
  },
] as const;

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
            path: "/tools",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools" }]} />

        <FadeIn className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Running Tools
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Quick calculators and a shoe quiz for beginners — free, no account
            required.
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-4 sm:grid-cols-1">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <StaggerItem key={tool.href}>
                <Link
                  href={tool.href}
                  className="group flex items-start gap-4 rounded-xl border border-border/60 bg-background p-5 transition-colors hover:border-primary/40 hover:bg-muted/30 sm:p-6"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold tracking-tight">
                        {tool.title}
                      </h2>
                      <ArrowRight
                        className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden
                      />
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        <FadeIn className="mt-10 text-center text-sm text-muted-foreground">
          <p>
            Not sure which plan to pick?{" "}
            <Link href="/start" className="font-medium text-primary hover:underline">
              Start here
            </Link>{" "}
            for a 60-second recommendation.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
