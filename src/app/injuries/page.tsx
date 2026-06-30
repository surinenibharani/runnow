import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  Bone,
  Footprints,
  HeartPulse,
  Shield,
  Stethoscope,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { pageMetadata } from "@/lib/seo/metadata";
import { INJURIES_SEO_KEYWORDS } from "@/lib/seo/keywords";

export const metadata: Metadata = pageMetadata({
  title: "Common Running Injuries — Prevention & Recovery for Beginners",
  description:
    "Shin splints, runner's knee, IT band pain, and plantar fasciitis — how beginners can prevent, recover from, and avoid common running injuries.",
  path: "/injuries",
  keywords: [...INJURIES_SEO_KEYWORDS],
});

const injuries = [
  {
    icon: Footprints,
    area: "Lower leg",
    title: "Shin splints",
    symptoms: "Pain along the inner edge of your shinbone, often when you increase mileage or intensity too fast.",
    avoid: [
      "Increase weekly mileage by no more than 10% per week",
      "Run on softer surfaces when possible — avoid only concrete",
      "Replace worn shoes (every 300–500 miles)",
      "Strengthen calves and hips with heel raises and glute bridges",
    ],
    fix: [
      "Rest or cross-train (bike, swim) for 1–2 weeks",
      "Ice shins 15–20 min after activity",
      "Gentle calf stretches and foam rolling",
      "Return with walk-run intervals before full running",
    ],
    seeSpecialist: [
      "Pain lasts more than 2–3 weeks despite rest and icing",
      "Pain is on one specific spot (not a diffuse strip) — could signal a stress fracture",
      "Swelling, redness, or warmth along the shin",
      "You can't walk without limping",
    ],
  },
  {
    icon: HeartPulse,
    area: "Knee",
    title: "Runner's knee (PFPS)",
    symptoms: "Dull ache around or behind the kneecap, worse going downstairs, after sitting, or on longer runs.",
    avoid: [
      "Don't ramp up hills and speed work in the same week",
      "Strengthen quads and glutes — weak hips often cause knee tracking issues",
      "Avoid overstriding; aim for a quicker, shorter stride on easy days",
      "Use the 10% rule for weekly volume increases",
    ],
    fix: [
      "Reduce mileage and avoid hills until pain subsides",
      "Ice after runs; try patellar taping if recommended by a physio",
      "Exercises: clamshells, side-lying leg lifts, wall sits",
      "Gradually rebuild volume once pain-free on stairs and easy walks",
    ],
    seeSpecialist: [
      "Pain persists beyond 2 weeks of reduced activity",
      "Knee locks, gives way, or swells noticeably after runs",
      "Pain is severe enough to change how you walk day-to-day",
      "Same knee pain returns every time you build mileage — a sports physio can assess tracking and hip strength",
    ],
  },
  {
    icon: Bone,
    area: "Hip / thigh",
    title: "IT band syndrome",
    symptoms: "Sharp or burning pain on the outside of the knee or hip, especially when running downhill or on cambered roads.",
    avoid: [
      "Don't skip hip and glute strength work",
      "Avoid always running the same direction on a track or sloped road",
      "Replace shoes before they're completely dead",
      "Build long runs gradually — IT band issues often follow volume spikes",
    ],
    fix: [
      "Rest from running; use cycling or swimming to maintain fitness",
      "Foam roll glutes and outer thigh (not directly on the IT band — it's not meant to be rolled aggressively)",
      "Strengthen gluteus medius: side steps with band, single-leg deadlifts",
      "Return slowly with flat routes before hills",
    ],
    seeSpecialist: [
      "Pain lasts more than 4 weeks despite rest and rehab exercises",
      "Pain shoots down the leg or you feel numbness/tingling",
      "IT band issues keep returning every time you increase distance",
      "A sports physio or orthopaedic specialist can check hip biomechanics and running gait",
    ],
  },
  {
    icon: Footprints,
    area: "Foot",
    title: "Plantar fasciitis",
    symptoms: "Stabbing heel pain, worst with first steps in the morning or after sitting.",
    avoid: [
      "Don't suddenly increase barefoot walking or minimalist shoes",
      "Stretch calves daily — tight calves pull on the plantar fascia",
      "Wear supportive shoes around the house if you have hard floors",
      "Avoid jumping into speed work on a weak base",
    ],
    fix: [
      "Roll a frozen water bottle under your foot for 5–10 min",
      "Towel scrunches and calf stretches (wall stretch, 30 sec each side)",
      "Night splints or supportive insoles can help some runners",
      "Recovery takes weeks to months — patience beats pushing through",
    ],
    seeSpecialist: [
      "Heel pain hasn't improved after 4–6 weeks of daily stretching and rest",
      "Pain is severe enough to avoid walking normally",
      "Sharp pain in the arch or heel after a sudden increase in activity",
      "A podiatrist can assess foot mechanics; a physio can guide loading and return-to-run",
    ],
  },
  {
    icon: AlertTriangle,
    area: "Ankle / calf",
    title: "Achilles tendinitis",
    symptoms: "Stiffness and pain in the Achilles tendon, especially in the morning or at the start of a run.",
    avoid: [
      "Never increase speed and distance in the same week",
      "Warm up with walking and easy jogging — no sprints cold",
      "Avoid excessive hill repeats when building mileage",
      "Eccentric heel drops (off a step) as prevention once you're running regularly",
    ],
    fix: [
      "Stop running if pain is sharp — Achilles tears are serious",
      "Eccentric heel lowers: 3 sets of 15, twice daily (off a step, slow lower)",
      "Ice and avoid hills until pain-free walking for a week",
      "Return with flat, easy runs only after a pain-free week of walking",
    ],
    seeSpecialist: [
      "Immediately — if you heard a pop, have sudden severe pain, or can't rise onto your toes",
      "Pain or stiffness lasts more than 2 weeks despite rest and eccentric exercises",
      "The tendon is visibly swollen, thickened, or warm to touch",
      "Morning stiffness doesn't ease after 30 minutes of walking — see a sports doctor or physio to rule out a partial tear",
    ],
  },
  {
    icon: Shield,
    area: "Bone",
    title: "Stress fractures",
    symptoms: "Localized pain that worsens with running and can hurt even at rest. Often in shins, feet, or hips.",
    avoid: [
      "Never ignore pain that gets worse as a run goes on",
      "Eat enough calories — under-fueling raises stress fracture risk",
      "Get enough calcium and vitamin D; consider a bone health check if you're at risk",
      "Alternate hard days with easy days; respect rest days in your plan",
    ],
    fix: [
      "Stop running immediately — do not try to run through this",
      "Expect 6–12 weeks (or more) off running depending on location",
      "Cross-train only with medical clearance (pool running, swimming)",
      "Address the cause: often rapid mileage increase, poor nutrition, or biomechanics",
    ],
    seeSpecialist: [
      "Right away — see a doctor or sports medicine physician for imaging (X-ray or MRI)",
      "Pain is pinpoint on the bone and worsens with weight-bearing",
      "Pain at rest or at night, not just during runs",
      "You've had multiple stress injuries or suspect low bone density — ask about a bone health workup",
    ],
  },
];

const preventionPrinciples = [
  "Follow the 10% rule — don't add more than 10% weekly mileage",
  "One rest day per week minimum; sleep 7–9 hours",
  "Rotate easy, moderate, and hard days — not every run is a workout",
  "Replace running shoes every 300–500 miles",
  "Strength train 2× per week: glutes, core, calves",
  "Pain that changes your gait means stop and assess",
];

export default function InjuriesPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Injuries" }]}
          />
          <Button
            nativeButton={false}
            render={<Link href="/injuries/for-women-runners" />}
            variant="outline"
            size="sm"
            className="border-violet-500/30 text-violet-700 hover:bg-violet-500/10 dark:text-violet-300"
          >
            Women runner injuries
          </Button>
        </div>

        <FadeIn className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Common Running Injuries
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            How to avoid them, how to recover, and when to get help.
            Prevention beats rehab every time.
          </p>
        </FadeIn>

        <FadeIn className="mb-10">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 flex gap-4">
              <Stethoscope className="size-6 text-primary shrink-0 mt-0.5" />
              <div className="text-sm leading-relaxed">
                <p className="font-medium text-foreground">
                  This page is educational, not medical advice.
                </p>
                <p className="text-muted-foreground mt-1">
                  Sharp pain, swelling, numbness, or pain that worsens over days
                  warrants a visit to a doctor or sports physiotherapist. When in
                  doubt, rest and get checked out.
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn className="mb-12">
          <h2 className="text-xl font-bold mb-4">Universal prevention habits</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {preventionPrinciples.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <Shield className="size-4 text-primary shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn className="mb-6">
          <h2 className="text-xl font-bold">Common injuries (all runners)</h2>
        </FadeIn>

        <StaggerChildren className="space-y-6 mb-12">
          {injuries.map((injury) => (
            <StaggerItem key={injury.title}>
              <Card className="border-border/60 hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <injury.icon className="size-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {injury.area}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{injury.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {injury.symptoms}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid gap-4 sm:grid-cols-2 ml-14">
                    <div className="rounded-xl bg-muted/40 p-4">
                      <h3 className="text-sm font-semibold text-foreground mb-2">
                        How to avoid
                      </h3>
                      <ul className="space-y-1.5">
                        {injury.avoid.map((tip) => (
                          <li
                            key={tip}
                            className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                          >
                            <span className="text-primary shrink-0">·</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl bg-muted/40 p-4">
                      <h3 className="text-sm font-semibold text-foreground mb-2">
                        How to fix / recover
                      </h3>
                      <ul className="space-y-1.5">
                        {injury.fix.map((tip) => (
                          <li
                            key={tip}
                            className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                          >
                            <span className="text-primary shrink-0">·</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 ml-14 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Stethoscope className="size-4 text-amber-600 dark:text-amber-500" />
                      When to see a specialist
                    </h3>
                    <ul className="space-y-1.5">
                      {injury.seeSpecialist.map((tip) => (
                        <li
                          key={tip}
                          className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                        >
                          <span className="text-amber-600 dark:text-amber-500 shrink-0">·</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            Stay healthy with a structured plan and built-in rest days.{" "}
            <Link href="/plan" className="text-primary hover:underline">
              View training plans
            </Link>
            {" · "}
            <Link href="/tips" className="text-primary hover:underline">
              Beginner tips
            </Link>
            {" · "}
            <Link href="/blog/running-guide-for-women" className="text-primary hover:underline">
              Women&apos;s running guide
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
