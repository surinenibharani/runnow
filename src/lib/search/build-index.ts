import { blogPosts, getPublishedBlogPosts } from "@/lib/blog/posts";
import { commonInjuries } from "@/lib/injuries/common-injuries";
import { menRunnerConcerns } from "@/lib/injuries/men-runner-concerns";
import { womenRunnerConcerns } from "@/lib/injuries/women-runner-concerns";
import { gearCategories } from "@/lib/gear/items";
import { PLANS } from "@/lib/plans";
import { SITE_DESCRIPTION } from "@/lib/site";
import {
  runnerTips,
  tipsPageGuides,
} from "@/lib/tips/tips";
import { situationalTips } from "@/lib/tips/situational";
import { weatherTips } from "@/lib/tips/weather";
import type { SiteSearchResult } from "./types";

const STATIC_PAGES: SiteSearchResult[] = [
  {
    id: "page-home",
    title: "Home",
    description: SITE_DESCRIPTION,
    href: "/",
    kind: "page",
    category: "Plans",
  },
  {
    id: "page-plan",
    title: "Training plans",
    description:
      "Free couch to 5K, 10K, half marathon, and marathon schedules you can customize in your browser.",
    href: "/plan",
    kind: "page",
    category: "Plans",
  },
  {
    id: "page-blog",
    title: "Running blog",
    description: "Beginner running articles on training, gear, recovery, and mindset.",
    href: "/blog",
    kind: "page",
    category: "Blog",
  },
  {
    id: "page-tips",
    title: "Running tips",
    description: "Quick tips for pacing, shoes, habits, hydration, and recovery.",
    href: "/tips",
    kind: "page",
    category: "Tips",
  },
  {
    id: "page-gear",
    title: "Gear guide",
    description: "Shoes, apparel, hydration, and tracking gear for new runners.",
    href: "/gear",
    kind: "page",
    category: "Gear",
  },
  {
    id: "page-tools",
    title: "Tools",
    description:
      "Pace calculator, race time predictor, and a beginner shoe quiz.",
    href: "/tools",
    kind: "page",
    category: "Tools",
  },
  {
    id: "page-start",
    title: "Start here",
    description:
      "Don't know where to start? Answer a short quiz about experience, fitness, goals, and schedule to get a recommended free plan.",
    href: "/start",
    kind: "page",
    category: "Plans",
  },
  {
    id: "page-injuries",
    title: "Injury prevention",
    description: "Common running injuries — how to avoid them and when to see a specialist.",
    href: "/injuries",
    kind: "page",
    category: "Health",
  },
  {
    id: "page-stories",
    title: "Success stories",
    description:
      "Beginners who started with walk-run plans and stuck with the habit.",
    href: "/stories",
    kind: "page",
    category: "Community",
  },
  {
    id: "page-stories-write",
    title: "Share your success story",
    description:
      "Write a testimonial about your beginner running journey — no account required.",
    href: "/stories/write",
    kind: "page",
    category: "Community",
  },
  {
    id: "page-instagram",
    title: "Instagram tips",
    description: "Curated running tips from LetsRunNow on Instagram.",
    href: "/instagram",
    kind: "page",
    category: "Tips",
  },
  {
    id: "page-about",
    title: "About LetsRunNow",
    description:
      "Why we built free browser-based training plans for beginner runners.",
    href: "/about",
    kind: "page",
    category: "Company",
  },
  {
    id: "page-faq",
    title: "FAQ",
    description: "Common questions about plans, accounts, Strava, and getting started.",
    href: "/faq",
    kind: "page",
    category: "Company",
  },
  {
    id: "page-contact",
    title: "Contact",
    description: "Email LetsRunNow for account help or site questions.",
    href: "/contact",
    kind: "page",
    category: "Company",
  },
];

const INJURY_ENTRIES: SiteSearchResult[] = [
  ...commonInjuries.map((injury) => ({
    id: `injury-${injury.slug}`,
    title: injury.title,
    description: injury.symptoms,
    href: `/injuries/${injury.slug}`,
    kind: "injury" as const,
    category: "Injuries",
  })),
  ...womenRunnerConcerns.map((concern) => ({
    id: `injury-women-${concern.id}`,
    title: concern.title,
    description: concern.symptoms,
    href: `/injuries/for-women-runners/${concern.id}`,
    kind: "injury" as const,
    category: "Women runner health",
  })),
  ...menRunnerConcerns.map((concern) => ({
    id: `injury-men-${concern.id}`,
    title: concern.title,
    description: concern.symptoms,
    href: `/injuries/for-men-runners/${concern.id}`,
    kind: "injury" as const,
    category: "Men runner health",
  })),
];

function buildIndex(): SiteSearchResult[] {
  const publishedSlugs = new Set(
    getPublishedBlogPosts().map((post) => post.slug)
  );

  const blog: SiteSearchResult[] = blogPosts
    .filter((post) => publishedSlugs.has(post.slug))
    .map((post) => ({
      id: `blog-${post.slug}`,
      title: post.title,
      description: post.excerpt,
      href: `/blog/${post.slug}`,
      kind: "blog" as const,
      category: post.category,
    }));

  const plans: SiteSearchResult[] = PLANS.map((plan) => ({
    id: `plan-${plan.id}`,
    title: `${plan.name} (${plan.duration})`,
    description: plan.description,
    href: `/plan/${plan.id}`,
    kind: "plan" as const,
    category: "Training plan",
  }));

  const tips: SiteSearchResult[] = runnerTips.map((tip) => ({
    id: `tip-${tip.slug}`,
    title: tip.title,
    description: tip.content,
    href: tip.blogSlug ? `/blog/${tip.blogSlug}` : `/tips/${tip.slug}`,
    kind: "tip" as const,
    category: tip.category,
  }));

  const guides: SiteSearchResult[] = tipsPageGuides.map((guide) => ({
    id: `guide-${guide.slug}`,
    title: guide.title,
    description: guide.description,
    href: `/blog/${guide.blogSlug}`,
    kind: "guide" as const,
    category: "Tips guide",
  }));

  const weather: SiteSearchResult[] = weatherTips.map((tip) => ({
    id: `weather-${tip.slug}`,
    title: tip.title,
    description: [tip.condition, ...tip.outdoorTips.slice(0, 2)].join(" · "),
    href: `/tips/bad-weather/${tip.slug}`,
    kind: "tip" as const,
    category: "Bad weather",
  }));

  const situational: SiteSearchResult[] = situationalTips.map((tip) => ({
    id: `situational-${tip.slug}`,
    title: tip.title,
    description: `${tip.audience} — ${tip.tips[0] ?? ""}`,
    href: `/tips/specific-situations/${tip.slug}`,
    kind: "tip" as const,
    category: tip.audience,
  }));

  const gear: SiteSearchResult[] = gearCategories.map((cat) => ({
    id: `gear-${cat.slug}`,
    title: cat.title,
    description: [cat.summary, cat.whenYouNeedIt].filter(Boolean).join(" "),
    href: `/gear#${cat.slug}`,
    kind: "gear" as const,
    category: cat.group,
  }));

  return [
    ...STATIC_PAGES,
    ...plans,
    ...blog,
    ...tips,
    ...guides,
    ...weather,
    ...situational,
    ...gear,
    ...INJURY_ENTRIES,
  ];
}

let cachedIndex: SiteSearchResult[] | null = null;

export function getSiteSearchIndex(): SiteSearchResult[] {
  if (!cachedIndex) {
    cachedIndex = buildIndex();
  }
  return cachedIndex;
}
