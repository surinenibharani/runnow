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
  Utensils,
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
  {
    slug: slugifyTipTitle("Be seen after dark"),
    icon: Moon,
    illustration: "cold",
    category: "Safety",
    title: "Be seen after dark",
    content:
      "Light colors, reflective details, and a small light beat invisible black kits. Assume drivers don't see you. Lit loops beat shortcuts.",
    blogSlug: "night-running-safety",
  },
  {
    slug: slugifyTipTitle("Layer for cold, then unzip"),
    icon: CloudRain,
    illustration: "cold",
    category: "Weather",
    title: "Layer for cold, then unzip",
    content:
      "Dress for ~10–15°F warmer than the start — you'll heat up. Wick sweat, protect hands and ears, and bail on black ice.",
    blogSlug: "cold-weather-running-hub",
  },
  {
    slug: slugifyTipTitle("Lube the hotspots before you leave"),
    icon: Heart,
    illustration: "health",
    category: "Gear",
    title: "Lube the hotspots before you leave",
    content:
      "Chafing is friction plus sweat. Anti-chafe balm on thighs, underarms, and bra lines before longer or humid runs saves your skin.",
    blogSlug: "chafing-blisters-running",
  },
  {
    slug: slugifyTipTitle("Blisters love new shoes on race day"),
    icon: Activity,
    illustration: "shoes",
    category: "Gear",
    title: "Blisters love new shoes on race day",
    content:
      "Debut shoes and socks on training runs first. Fit and sock choice prevent most blisters better than any mid-race tape scramble.",
    blogSlug: "chafing-blisters-running",
  },
  {
    slug: slugifyTipTitle("Outer lanes are for warming up"),
    icon: Footprints,
    illustration: "easy-pace",
    category: "Training",
    title: "Outer lanes are for warming up",
    content:
      "On a track, leave lane 1 for faster work. Warm up and recover in outer lanes, pass outside, and clear the inside between reps.",
    blogSlug: "first-track-workout-beginners",
  },
  {
    slug: slugifyTipTitle("Trail pace is supposed to look slow"),
    icon: Footprints,
    illustration: "easy-pace",
    category: "Training",
    title: "Trail pace is supposed to look slow",
    content:
      "Roots and climbs punish road ego. Judge trail runs by effort and time on feet. Hiking the steep bits is normal — not a failure.",
    blogSlug: "trail-ultra-intro-beginners",
  },
  {
    slug: slugifyTipTitle("Family runs are for fun first"),
    icon: Users,
    illustration: "mindset",
    category: "Mindset",
    title: "Family runs are for fun first",
    content:
      "Keep kid loops playful and walk-friendly. Save workouts for solo days. Never use running as punishment — joy builds lifelong movers.",
    blogSlug: "kids-family-running",
  },
  {
    slug: slugifyTipTitle("Missed a week? Don't double up"),
    icon: Clock,
    illustration: "calendar",
    category: "Scheduling",
    title: "Missed a week? Don't double up",
    content:
      "Catch-up stacks cause injuries. Repeat the week you left, or resume easy. Adaptive plans on LetsRunNow will nudge you to stay patient.",
    blogSlug: "what-to-do-when-you-miss-a-run",
  },
  {
    slug: slugifyTipTitle("Nudge cadence — don't chase 180"),
    icon: Footprints,
    illustration: "easy-pace",
    category: "Training",
    title: "Nudge cadence — don't chase 180",
    content:
      "Count your easy-pace steps for 30 seconds and double. If you want a tweak, aim about 5–10% quicker with shorter, quieter steps — not a forced celebrity cadence.",
    blogSlug: "cadence-drills-runners",
  },
  {
    slug: slugifyTipTitle("Mobility in minutes, not marathons"),
    icon: Activity,
    illustration: "warmup",
    category: "Recovery",
    title: "Mobility in minutes, not marathons",
    content:
      "A short walk and a few leg swings beat a 40-minute flow you'll abandon. Optional foam rolling: a few minutes on calves and quads after hard days is enough.",
    blogSlug: "foam-rolling-mobility-runners",
  },
  {
    slug: slugifyTipTitle("Pack a lunch-run kit under your desk"),
    icon: Clock,
    illustration: "calendar",
    category: "Scheduling",
    title: "Pack a lunch-run kit under your desk",
    content:
      "Shoes, shorts, wipes, deodorant, spare shirt. Keep midday runs easy and short enough to return human for the 1 p.m. meeting.",
    blogSlug: "workplace-lunch-run",
  },
  {
    slug: slugifyTipTitle("Arrive early for altitude races"),
    icon: CloudRain,
    illustration: "heat",
    category: "Racing",
    title: "Arrive early for altitude races",
    content:
      "Sea-level pace goals often fail at elevation. Land early when you can, keep the first 48 hours easy, and race by feel — not your hometown splits.",
    blogSlug: "altitude-travel-race-running",
  },
  {
    slug: slugifyTipTitle("If easy days aren't easy, slow down now"),
    icon: Heart,
    illustration: "easy-pace",
    category: "Training",
    title: "If easy days aren't easy, slow down now",
    content:
      "Easy days build the aerobic base. If you're gasping, racing strangers, or sore for days after 'recovery' runs, you're training hard by accident — walk, shorten, or dial effort down.",
    blogSlug: "easy-runs-effort-heart-rate",
  },
  {
    slug: slugifyTipTitle("Fuel the miles — under-eating isn't toughness"),
    icon: Utensils,
    illustration: "health",
    category: "Nutrition",
    title: "Fuel the miles — under-eating isn't toughness",
    content:
      "Training harder while eating less is a common path to fatigue, niggles, and stress injuries — not toughness. Match food to the work: a carb-friendly snack before longer or harder runs, a real meal after, and enough total calories across the day so easy miles still feel easy. Skip the habit of stacking mileage on a diet deficit. Warning signs worth taking seriously include constant tiredness, stalled progress, recurring bone or soft-tissue pain, frequent illness, and (if you menstruate) missed or irregular periods. When those stack up, ease training and fuel more — and get clinical help if they persist. Under-eating isn't a badge; food is training gear.",
    blogSlug: "reds-low-energy-availability-runners",
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
