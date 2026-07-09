import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Clock,
  CloudRain,
  Droplets,
  Footprints,
  Heart,
  Moon,
  Sun,
  Users,
  Wind,
} from "lucide-react";

export function slugifyTipTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export type TipIllustrationId =
  | "easy-pace"
  | "shoes"
  | "calendar"
  | "hydration"
  | "recovery"
  | "breathing"
  | "mindset"
  | "warmup"
  | "rain"
  | "heat"
  | "cold"
  | "storm"
  | "wind"
  | "air-quality"
  | "indoor"
  | "pregnancy"
  | "senior"
  | "health";

export type RunnerTip = {
  slug: string;
  icon: LucideIcon;
  illustration: TipIllustrationId;
  category: string;
  title: string;
  content: string;
  blogSlug?: string;
};

export const runnerTips: RunnerTip[] = [
  {
    slug: slugifyTipTitle("Slow down — seriously"),
    icon: Footprints,
    illustration: "easy-pace",
    category: "Getting Started",
    title: "Slow down — seriously",
    content:
      "If you can't hold a conversation while jogging, you're going too fast. The goal isn't speed; it's building the habit and aerobic base. Walk breaks are part of the plan, not a failure.",
    blogSlug: "how-to-pace-yourself",
  },
  {
    slug: slugifyTipTitle("Shoes matter more than gadgets"),
    icon: Activity,
    illustration: "shoes",
    category: "Gear",
    title: "Shoes matter more than gadgets",
    content:
      "Visit a running store for a gait analysis if you can. A decent pair of running shoes is the only real investment you need. Skip the expensive watch until you're hooked.",
    blogSlug: "choosing-running-shoes",
  },
  {
    slug: slugifyTipTitle("Put runs on your calendar"),
    icon: Clock,
    illustration: "calendar",
    category: "Scheduling",
    title: "Put runs on your calendar",
    content:
      "Treat workouts like appointments. Morning runs work for many beginners because nothing else competes for your time. Pick three days and protect them.",
    blogSlug: "building-a-running-habit",
  },
  {
    slug: slugifyTipTitle("Drink water, not just during runs"),
    icon: Droplets,
    illustration: "hydration",
    category: "Hydration",
    title: "Drink water, not just during runs",
    content:
      "For runs under 45 minutes, you don't need sports drinks. Stay hydrated throughout the day. Bring water on hot days or longer sessions.",
    blogSlug: "nutrition-for-runners",
  },
  {
    slug: slugifyTipTitle("Rest days are training days"),
    icon: Moon,
    illustration: "recovery",
    category: "Recovery",
    title: "Rest days are training days",
    content:
      "Your body adapts during rest, not during the run itself. Sleep 7–9 hours. Don't skip rest days to 'get ahead' — that's how beginners get injured.",
    blogSlug: "what-to-do-on-rest-days",
  },
  {
    slug: slugifyTipTitle("Find a breathing rhythm"),
    icon: Wind,
    illustration: "breathing",
    category: "Breathing",
    title: "Find a breathing rhythm",
    content:
      "Try breathing in for 3 steps and out for 3 steps. If that's hard, slow down. Mouth breathing is fine during exercise — don't overthink it.",
    blogSlug: "breathing-while-running",
  },
  {
    slug: slugifyTipTitle("Bad runs happen to everyone"),
    icon: Heart,
    illustration: "mindset",
    category: "Mindset",
    title: "Bad runs happen to everyone",
    content:
      "Some days your legs feel like lead. That's normal. Show up anyway, even if you walk more than planned. Consistency over perfection, always.",
    blogSlug: "mental-side-of-running",
  },
  {
    slug: slugifyTipTitle("Warm up and cool down"),
    icon: Sun,
    illustration: "warmup",
    category: "Safety",
    title: "Warm up and cool down",
    content:
      "Start every session with 5 minutes of brisk walking. End with 5 minutes of easy walking and light stretching. Your future knees will thank you.",
    blogSlug: "avoiding-injuries",
  },
];

export const tipsPageGuides = [
  {
    slug: "bad-weather",
    href: "/tips/bad-weather",
    title: "Bad weather? Stay on track",
    description:
      "Weather-aware tips for rain, heat, ice, storms, and poor air quality — plus indoor alternatives so you keep moving.",
    icon: CloudRain,
    iconClassName: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    illustration: "rain" as TipIllustrationId,
    blogSlug: "running-in-bad-weather",
  },
  {
    slug: "specific-situations",
    href: "/tips/specific-situations",
    title: "Running for specific situations",
    description:
      "Guidance for pregnancy, older runners (55+), and common health conditions like diabetes, asthma, and arthritis.",
    icon: Users,
    iconClassName: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    illustration: "health" as TipIllustrationId,
    blogSlug: "running-with-health-conditions",
  },
] as const;

export const tipsTickerItems = [
  ...runnerTips.map((tip) => ({
    title: tip.title,
    href: `/tips/${tip.slug}`,
  })),
  ...tipsPageGuides.map((guide) => ({
    title: guide.title,
    href: guide.href,
  })),
];
