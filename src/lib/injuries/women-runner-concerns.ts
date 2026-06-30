import type { LucideIcon } from "lucide-react";
import { Baby, Bone, HeartPulse } from "lucide-react";

export type WomenRunnerConcern = {
  icon: LucideIcon;
  area: string;
  title: string;
  symptoms: string;
  avoid: string[];
  fix: string[];
  seeSpecialist: string[];
  readMore?: {
    label: string;
    href: string;
  };
};

export const womenRunnerConcerns: WomenRunnerConcern[] = [
  {
    icon: Bone,
    area: "Bone health / energy",
    title: "RED-S and stress fractures",
    symptoms:
      "Lost or irregular periods, persistent fatigue, frequent illness, or recurring bone pain — often alongside training hard and eating too little (Relative Energy Deficiency in Sport, or RED-S).",
    avoid: [
      "Eat enough to fuel runs and daily life — not just on workout days",
      "Track period changes when mileage or intensity jumps",
      "Don't stack hard weeks back-to-back without recovery",
      "Address iron levels if you're tired despite sleep (common with heavy periods)",
    ],
    fix: [
      "Reduce training load and prioritize nutrition before pushing mileage again",
      "See a doctor if your period stops or stays irregular for 3+ months",
      "Cross-train while bone pain heals — see stress fractures on the main injuries page",
      "A sports dietitian can help if under-fueling is hard to spot on your own",
    ],
    seeSpecialist: [
      "Missed periods, stress fracture suspicion, or unexplained fatigue — see your GP or sports medicine doctor",
      "Pinpoint bone pain that worsens with running — imaging may be needed",
      "History of disordered eating or repeated stress injuries — ask about a full RED-S workup",
    ],
    readMore: {
      label: "Women's running guide",
      href: "/blog/running-guide-for-women",
    },
  },
  {
    icon: HeartPulse,
    area: "Pelvic floor",
    title: "Leakage or heaviness on impact",
    symptoms:
      "Urinary leakage, pelvic pressure, or discomfort when you run — especially on downhills, speed work, or after pregnancy. More common than most people admit, and often improvable.",
    avoid: [
      'Skip the "just run through it" mindset — leaking is a signal, not a badge of effort',
      "Wear a supportive sports bra and test pelvic floor engagement in daily life",
      "Build volume gradually after pregnancy — cardio fitness returns faster than pelvic support",
      "Stay hydrated, but don't chug right before a hard interval session",
    ],
    fix: [
      "Book a pelvic floor physiotherapist — gold standard for runners",
      "Temporary: lighter liners on impact days; focus on form, not shame",
      "Reduce bounce-heavy days (long downhills, sprint repeats) until symptoms improve",
      "Core and breath work from a physio often beats random Kegel apps",
    ],
    seeSpecialist: [
      "Leakage on most runs, pelvic heaviness, or bulging sensation — pelvic floor physio",
      "Symptoms started or worsened after childbirth — get clearance before high mileage",
      "Pain with intercourse, bowel changes, or prolapse symptoms — GP or women's health physio",
    ],
    readMore: {
      label: "Women's running guide",
      href: "/blog/running-guide-for-women",
    },
  },
  {
    icon: Baby,
    area: "Pregnancy / postpartum",
    title: "Running while pregnant or returning after birth",
    symptoms:
      'Pubic or pelvic girdle pain, calf swelling, dizziness, or feeling "not ready" despite old fitness levels — your body needs a different timeline than your Strava history.',
    avoid: [
      "Get OB or midwife clearance before running during pregnancy or postpartum",
      "Don't compare your comeback pace to pre-pregnancy PRs in month one",
      "Stop for contractions, bleeding, dizziness, calf swelling, or sharp pelvic pain",
      "Prioritize pelvic floor and core rehab if recommended before long runs",
    ],
    fix: [
      "Use the talk test — most easy running stays conversational if cleared to run",
      "Shorter, flatter runs; walk-run is fine and smart",
      "Postpartum: rebuild walk-run before continuous miles; hills come later",
      "Cross-train (swim, bike) if impact symptoms flare",
    ],
    seeSpecialist: [
      "Any pregnancy red flags — contact your provider immediately",
      "Pubic symphysis pain (SPD) that limits walking — physio with pregnancy experience",
      "Postpartum leakage, heaviness, or diastasis concerns — pelvic floor physio before ramping mileage",
    ],
    readMore: {
      label: "Health conditions & running",
      href: "/blog/running-with-health-conditions",
    },
  },
];
