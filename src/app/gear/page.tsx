import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Footprints, ShoppingBag, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { GearCategoryCard } from "@/components/gear/gear-category-card";
import { GearTierSuggestions } from "@/components/gear/gear-tier-suggestions";
import { GearWeeklyNews } from "@/components/gear/gear-weekly-news";
import { MedicalDisclaimerBanner } from "@/components/legal/medical-disclaimer-banner";
import { HubNextSteps } from "@/components/content/hub-next-steps";
import { RelatedPathways } from "@/components/content/related-pathways";
import { HubEditorialBlock } from "@/components/content/hub-editorial";
import {
  gearTierMeta,
  gearTiers,
  getGearByTier,
  type GearTier,
} from "@/lib/gear/items";
import {
  getGearUpdates,
  formatGearUpdatedAt,
  getMergedSuggestions,
  getWeeklyTierSuggestions,
} from "@/lib/gear/updates";
import { gearHubNextSteps, gearHubReads, getGearPathway } from "@/lib/content-pathways";
import { gearHubEditorial } from "@/lib/hub-seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqPageJsonLd, howToJsonLd, webPageJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
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
          faqPageJsonLd(gearHubEditorial.faqs, `${SITE_URL}/gear`),
          howToJsonLd({
            name: gearHubEditorial.howTo.name,
            description: gearHubEditorial.howTo.description,
            path: "/gear",
            steps: gearHubEditorial.howTo.steps,
          }),
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Gear guide" }]} />

        <FadeIn className="mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Running Gear Guide
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              What to wear, carry, and fuel with — from your first 5K to your first
              marathon. Suggestions, not sponsorships.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Guide refreshed every Tuesday and Friday — last updated{" "}
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
            <a
              href="#this-week"
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/10"
            >
              This week
              <ArrowUpRight className="size-3.5 shrink-0 opacity-50" aria-hidden />
            </a>
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
          <GearWeeklyNews updates={gearUpdates} />
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
                className="hub-section scroll-mt-24"
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
                  suggestions={getWeeklyTierSuggestions(tier)}
                />

                <div className="space-y-6">
                  {items.map((item) => {
                    const pathway = getGearPathway(item.slug);
                    return (
                    <div key={item.slug}>
                      <GearCategoryCard
                        compact
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
                          pathway ? (
                            <RelatedPathways
                              pathway={pathway}
                              className="mt-4"
                            />
                          ) : undefined
                        }
                      />
                    </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <FadeIn className="mt-12 mb-10">
          <Card className="border-sky-500/20 bg-sky-500/[0.03] transition-shadow duration-300 hover:shadow-md">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-700 dark:text-sky-300">
                  <BookOpen className="size-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    Weather running gear
                  </h2>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    What to wear — and skip — for everyday weather, heat, cold,
                    rain, and ice. Tops, bottoms, and shoes, with specific picks
                    and a louder list of what not to wear for everyone, women,
                    and men.
                  </p>
                </div>
              </div>
              <Button
                nativeButton={false}
                render={
                  <Link href="/blog/weather-running-gear-tops-bottoms-shoes" />
                }
                variant="outline"
                size="sm"
                className="shrink-0 border-sky-500/30 text-sky-700 hover:bg-sky-500/10 dark:text-sky-300"
              >
                Read guide
                <ArrowRight className="size-4" />
              </Button>
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

        <FadeIn className="mb-12">
          <RelatedPathways
            pathway={{
              title: "Read first — then buy only what you need",
              links: gearHubReads,
            }}
          />
        </FadeIn>

        <HubEditorialBlock editorial={gearHubEditorial} />

        <FadeIn className="mt-12">
          <HubNextSteps
            heading="After shoes, do this"
            steps={gearHubNextSteps}
          />
        </FadeIn>

        <FadeIn className="mt-8">
          <StartPlanCta
            variant="compact"
            headline="Have shoes? Get a plan."
            description="A short quiz recommends a free beginner schedule. No account required."
          />
        </FadeIn>
      </div>
    </div>
  );
}
