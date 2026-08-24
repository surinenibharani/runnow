import { runnerTips, type RunnerTip } from "./tips";

export type TipHubSection = {
  id: string;
  title: string;
  summary: string;
  nextHref: string;
  nextLabel: string;
  categories: readonly string[];
};

export const tipHubSections: TipHubSection[] = [
  {
    id: "getting-started",
    title: "Getting started",
    summary:
      "Slow, walk–run, and showing up. This is how the first month actually works.",
    nextHref: "/stories",
    nextLabel: "Success stories",
    categories: ["Getting Started"],
  },
  {
    id: "training",
    title: "Training",
    summary:
      "Easy days, cadence, trails, and why more junk miles aren’t a shortcut.",
    nextHref: "/plan",
    nextLabel: "Browse plans",
    categories: ["Training", "Breathing"],
  },
  {
    id: "gear",
    title: "Gear",
    summary: "Shoes, socks, bras, and skip-the-watch until you’re hooked.",
    nextHref: "/gear",
    nextLabel: "Gear guide",
    categories: ["Gear"],
  },
  {
    id: "scheduling",
    title: "Scheduling",
    summary:
      "Put it on the calendar. Missed weeks stay missed. Run when you’ll actually go.",
    nextHref: "/start",
    nextLabel: "Match a plan to your week",
    categories: ["Scheduling"],
  },
  {
    id: "recovery",
    title: "Recovery",
    summary: "Rest, water, and a few minutes of mobility — not a second workout.",
    nextHref: "/injuries",
    nextLabel: "Injury prevention",
    categories: ["Recovery", "Hydration"],
  },
  {
    id: "health",
    title: "Health",
    summary:
      "Fueling, stitches, air quality, coming back from a cold — and when to stop.",
    nextHref: "/tips/specific-situations",
    nextLabel: "Health situations",
    categories: ["Health", "Nutrition"],
  },
  {
    id: "mindset",
    title: "Mindset",
    summary: "Bad runs count. Family runs are for fun. You’re not behind.",
    nextHref: "/stories",
    nextLabel: "Success stories",
    categories: ["Mindset"],
  },
  {
    id: "safety",
    title: "Safety & conditions",
    summary: "Warm-ups, visibility, weather, and racing at altitude.",
    nextHref: "/tips/bad-weather",
    nextLabel: "Bad-weather tips",
    categories: ["Safety", "Weather", "Racing"],
  },
];

export function tipsForHubSection(section: TipHubSection): RunnerTip[] {
  const set = new Set(section.categories);
  return runnerTips.filter((tip) => set.has(tip.category));
}

export function getRelatedTipsInCategory(
  slug: string,
  limit = 3
): RunnerTip[] {
  const tip = runnerTips.find((t) => t.slug === slug);
  if (!tip) return runnerTips.filter((t) => t.slug !== slug).slice(0, limit);
  return runnerTips
    .filter((t) => t.slug !== slug && t.category === tip.category)
    .slice(0, limit);
}
