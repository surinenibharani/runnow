import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Footprints, ShoppingBag, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { GearCategoryCard } from "@/components/gear/gear-category-card";
import { GearTierSuggestions } from "@/components/gear/gear-tier-suggestions";
import { GearWeeklyNews } from "@/components/gear/gear-weekly-news";
import { MedicalDisclaimerBanner } from "@/components/legal/medical-disclaimer-banner";
import { GearPageHero } from "@/components/visuals/gear-scenes";
import {
  gearTierMeta,
  gearTiers,
  getGearByTier,
  type GearTier,
} from "@/lib/gear/items";
import { getGearUpdates, formatGearUpdatedAt, getMergedSuggestions } from "@/lib/gear/updates";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";
import { GEAR_SEO_KEYWORDS } from "@/lib/seo/keywords";
import { cn } from "@/lib/utils";

const GEAR_TITLE = "Beginner Running Gear Guide — Shoes, Socks & Essentials";
const GEAR_DESCRIPTION =
  "Beginner running gear guide: first shoes, socks, what to wear, budget picks under $50, and when you actually need a watch — couch to 5K starter kit.";

export const metadata: Metadata = pageMetadata({
  title: GEAR_TITLE,
  description: GEAR_DESCRIPTION,
  path: "/gear",
  keywords: [...GEAR_SEO_KEYWORDS],
});

const tierSectionId = (tier: GearTier) =>
  tier === "start-here" ? "start-here" : "level-up";

const tierIcon = (tier: GearTier) =>
  tier === "start-here" ? ShoppingBag : Sparkles;

export default function GearPage() {
  const gearUpdates = getGearUpdates();

  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: GEAR_TITLE,
            description: GEAR_DESCRIPTION,
            path: "/gear",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Gear guide", path: "/gear" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Gear guide" }]} />

        <FadeIn className="mb-8">
          <GearPageHero className="mb-8" />
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Running Gear Guide
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              What to wear, carry, and fuel with — from your first 5K to your first
              marathon. Suggestions, not sponsorships.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Guide refreshed weekly — last updated{" "}
              <time dateTime={gearUpdates.updatedAt}>
                {formatGearUpdatedAt(gearUpdates.updatedAt)}
              </time>
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mb-8">
          <nav
            aria-label="Gear budget sections"
            className="flex flex-wrap justify-center gap-2"
          >
            {gearTiers.map((tier) => {
              const meta = gearTierMeta[tier];
              const Icon = tierIcon(tier);
              return (
                <a
                  key={tier}
                  href={`#${tierSectionId(tier)}`}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    tier === "start-here"
                      ? "border-emerald-500/30 bg-emerald-500/5 text-foreground hover:bg-emerald-500/10"
                      : "border-violet-500/30 bg-violet-500/5 text-foreground hover:bg-violet-500/10"
                  )}
                >
                  <Icon className="size-3.5 shrink-0 opacity-70" aria-hidden />
                  {meta.title}
                  <ArrowUpRight className="size-3.5 shrink-0 opacity-50" aria-hidden />
                </a>
              );
            })}
          </nav>
        </FadeIn>

        <FadeIn className="mb-10">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex gap-4 p-6">
              <Footprints className="mt-0.5 size-6 shrink-0 text-primary" />
              <div className="text-sm leading-relaxed">
                <p className="font-medium text-foreground">
                  Shoes are all you need to start. Add the rest as you go.
                </p>
                <p className="mt-1 text-muted-foreground">
                  You don&apos;t need everything on day one. Buy gear when a real
                  need shows up — heat, distance, chafing, or weather — not
                  because an ad told you to.
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn className="mb-10">
          <MedicalDisclaimerBanner>
            Some picks (like anti-chafe or skin products) are used off-label by
            runners — check the label and ask a clinician or pharmacist if you
            have sensitive skin or a health condition.{" "}
          </MedicalDisclaimerBanner>
        </FadeIn>

        <div className="space-y-16">
          {gearTiers.map((tier) => {
            const meta = gearTierMeta[tier];
            const items = getGearByTier(tier);
            const Icon = tierIcon(tier);

            return (
              <section
                key={tier}
                id={tierSectionId(tier)}
                className="scroll-mt-24"
              >
                <FadeIn className="mb-8">
                  <div
                    className={cn(
                      "rounded-xl border p-5 sm:p-6",
                      tier === "start-here"
                        ? "border-emerald-500/20 bg-emerald-500/5"
                        : "border-violet-500/20 bg-violet-500/5"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-xl",
                          tier === "start-here"
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                            : "bg-violet-500/15 text-violet-700 dark:text-violet-400"
                        )}
                      >
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                          {meta.title}
                        </h2>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {meta.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                <GearTierSuggestions
                  tier={tier}
                  intro={meta.suggestionsIntro}
                  suggestions={meta.suggestions}
                />

                <StaggerChildren className="space-y-6">
                  {items.map((item) => (
                    <StaggerItem key={item.slug}>
                      <GearCategoryCard
                        item={item}
                        suggestions={getMergedSuggestions(
                          item.slug,
                          item.suggestions
                        )}
                        womenPicks={
                          item.womenSuggestions
                            ? getMergedSuggestions(
                                item.slug,
                                item.womenSuggestions,
                                "women"
                              )
                            : undefined
                        }
                        afterCard={
                          item.slug === "coros" ? (
                            <GearWeeklyNews updates={gearUpdates} />
                          ) : undefined
                        }
                      />
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </section>
            );
          })}
        </div>

        <FadeIn className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            New to running? Don&apos;t know where to start?{" "}
            <Link href="/start" className="text-primary hover:underline">
              Start here
            </Link>
            {" · "}
            <Link href="/blog/choosing-running-shoes" className="text-primary hover:underline">
              shoe guide
            </Link>
            {" · "}
            <Link href="/plan" className="text-primary hover:underline">
              training plans
            </Link>
            {" · "}
            <Link href="/dashboard" className="text-primary hover:underline">
              connect Strava
            </Link>
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <StartPlanCta variant="compact" />
        </FadeIn>
      </div>
    </div>
  );
}
