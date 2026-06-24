import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { gearCategories, gearGroups } from "@/lib/gear/items";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Running Gear Guide",
  description:
    "Beginner-friendly gear picks for shoes, apparel, hydration, tracking watches, Strava, and more — what to buy and when you actually need it.",
  path: "/gear",
});

export default function GearPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <FadeIn className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Running Gear Guide
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            What to wear, carry, and fuel with — from your first 5K to your first
            marathon. Suggestions, not sponsorships.
          </p>
        </FadeIn>

        <FadeIn className="mb-10">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 flex gap-4">
              <ShoppingBag className="size-6 text-primary shrink-0 mt-0.5" />
              <div className="text-sm leading-relaxed">
                <p className="font-medium text-foreground">
                  Start with shoes. Add the rest as you go.
                </p>
                <p className="text-muted-foreground mt-1">
                  You don&apos;t need everything on day one. Buy gear when a real
                  need shows up — heat, distance, chafing, or weather — not
                  because an ad told you to.
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <div className="space-y-14">
          {gearGroups.map((group) => (
            <section key={group}>
              <FadeIn>
                <h2 className="text-xl font-bold mb-6">{group}</h2>
              </FadeIn>
              <StaggerChildren className="space-y-6">
                {gearCategories
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <StaggerItem key={item.slug}>
                      <Card
                        id={item.slug}
                        className="border-border/60 hover:shadow-md transition-shadow duration-300 scroll-mt-24"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-4">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <item.icon className="size-5" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg">{item.title}</CardTitle>
                              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                {item.summary}
                              </p>
                              <Badge variant="secondary" className="mt-3 text-xs">
                                {item.whenYouNeedIt}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 ml-14">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-xl bg-muted/40 p-4">
                              <h3 className="text-sm font-semibold mb-2">
                                What to look for
                              </h3>
                              <ul className="space-y-1.5">
                                {item.whatToLookFor.map((tip) => (
                                  <li
                                    key={tip}
                                    className="text-sm text-muted-foreground flex gap-2 leading-relaxed"
                                  >
                                    <span className="text-primary shrink-0">·</span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="rounded-xl bg-muted/40 p-4">
                              <h3 className="text-sm font-semibold mb-2">
                                Suggestions
                              </h3>
                              <ul className="space-y-2">
                                {item.suggestions.map((pick) => (
                                  <li key={pick.name} className="text-sm">
                                    <span className="font-medium text-foreground">
                                      {pick.name}
                                    </span>
                                    <span className="text-muted-foreground">
                                      {" "}
                                      — {pick.note}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          {item.pros && item.cons && (
                            <div className="grid gap-4 sm:grid-cols-2 mt-4">
                              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                                <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                                  Pros
                                </h3>
                                <ul className="space-y-1.5">
                                  {item.pros.map((pro) => (
                                    <li
                                      key={pro}
                                      className="text-sm text-muted-foreground flex gap-2 leading-relaxed"
                                    >
                                      <span className="text-emerald-600 dark:text-emerald-400 shrink-0">
                                        +
                                      </span>
                                      {pro}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                                <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2">
                                  Cons
                                </h3>
                                <ul className="space-y-1.5">
                                  {item.cons.map((con) => (
                                    <li
                                      key={con}
                                      className="text-sm text-muted-foreground flex gap-2 leading-relaxed"
                                    >
                                      <span className="text-amber-600 dark:text-amber-400 shrink-0">
                                        −
                                      </span>
                                      {con}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  ))}
              </StaggerChildren>
            </section>
          ))}
        </div>

        <FadeIn className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            New to running? Start with our{" "}
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
      </div>
    </div>
  );
}
