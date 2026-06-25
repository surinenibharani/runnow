import type { Metadata } from "next";
import type { TrainingPlan } from "@/lib/plan-types";
import { PLANS, PLAN_FAMILIES } from "@/lib/plans";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";

const PLAN_KEYWORDS = [
  "couch to 5k",
  "5k training plan",
  "half marathon training plan",
  "marathon training plan",
  "beginner running plan",
  "free running plan",
  "cross-training schedule",
  SITE_NAME,
] as const;

export const PLAN_INDEX_DESCRIPTION =
  "Free Couch to 5K, half marathon, and marathon training plans from 4 to 16 weeks. Pick your duration, customize run days and cross-training, and track progress — signup optional.";

function truncateDescription(text: string, max = 158): string {
  if (text.length <= max) return text;
  const trimmed = text.slice(0, max - 1);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 80 ? lastSpace : trimmed.length)}…`;
}

export function getPlanMetaDescription(plan: TrainingPlan): string {
  return truncateDescription(
    `Free ${plan.name} plan (${plan.duration}): ${plan.description} ${plan.runsPerWeek} runs per week with cross-training, rest days, and browser progress tracking.`
  );
}

export function getPlanPageTitle(plan: TrainingPlan): string {
  return `${plan.name} Training Plan (${plan.duration})`;
}

export function buildPlanPageMetadata(planId?: string | null): Metadata {
  const plan = planId ? PLANS.find((p) => p.id === planId) : undefined;

  if (plan) {
    return {
      ...pageMetadata({
        title: getPlanPageTitle(plan),
        description: getPlanMetaDescription(plan),
        path: `/plan?plan=${plan.id}`,
      }),
      keywords: [
        plan.name.toLowerCase(),
        `${plan.duration} training plan`,
        plan.familyId.replace("-", " "),
        ...PLAN_KEYWORDS,
      ],
    };
  }

  return {
    ...pageMetadata({
      title: "Free Running Training Plans",
      description: PLAN_INDEX_DESCRIPTION,
      path: "/plan",
    }),
    keywords: [...PLAN_KEYWORDS],
  };
}

function organizationRef() {
  return {
    "@type": "Organization" as const,
    name: SITE_NAME,
    url: SITE_URL,
  };
}

function courseEntity(plan: TrainingPlan) {
  return {
    "@type": "Course" as const,
    name: getPlanPageTitle(plan),
    description: plan.description,
    url: `${SITE_URL}/plan?plan=${plan.id}`,
    provider: organizationRef(),
    isAccessibleForFree: true,
    courseMode: "online",
    timeRequired: `P${plan.durationWeeks}W`,
    educationalLevel: "Beginner",
    teaches: plan.name,
    about: plan.prerequisite,
  };
}

function courseListItem(plan: TrainingPlan, position: number) {
  return {
    "@type": "ListItem" as const,
    position,
    item: courseEntity(plan),
  };
}

export function plansBreadcrumbJsonLd(plan?: TrainingPlan) {
  const items = [
    { name: "Home", path: "/" },
    { name: "Training Plans", path: "/plan" },
  ];

  if (plan) {
    items.push({
      name: getPlanPageTitle(plan),
      path: `/plan?plan=${plan.id}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function plansItemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Running Training Plans",
    description: PLAN_INDEX_DESCRIPTION,
    numberOfItems: PLANS.length,
    itemListElement: PLANS.map((plan, index) => courseListItem(plan, index + 1)),
  };
}

export function plansWebPageJsonLd(plan?: TrainingPlan) {
  const url = plan ? `${SITE_URL}/plan?plan=${plan.id}` : `${SITE_URL}/plan`;
  const name = plan ? getPlanPageTitle(plan) : "Free Running Training Plans";
  const description = plan ? getPlanMetaDescription(plan) : PLAN_INDEX_DESCRIPTION;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: PLAN_FAMILIES.map((family) => ({
      "@type": "Thing",
      name: family.name,
      description: family.prerequisite,
    })),
    ...(plan && {
      mainEntity: courseEntity(plan),
    }),
  };
}

/** JSON-LD bundle for /plan (optionally focused on one plan variant). */
export function plansPageJsonLd(selectedPlan?: TrainingPlan) {
  return [
    plansBreadcrumbJsonLd(selectedPlan),
    plansWebPageJsonLd(selectedPlan),
    plansItemListJsonLd(),
  ];
}

export function getPlanSitemapEntries(): Array<{
  url: string;
  changeFrequency: "weekly";
  priority: number;
}> {
  return PLANS.map((plan) => ({
    url: `${SITE_URL}/plan?plan=${plan.id}`,
    changeFrequency: "weekly" as const,
    priority: plan.id === "5k-8w" ? 0.85 : 0.8,
  }));
}
