import type { GearSuggestion, GearTier, GearTierSuggestion } from "@/lib/gear/items";
import type { GearSuggestionPick, GearUpdates } from "@/lib/gear/types";
import gearUpdatesData from "@/data/gear-updates.json";
import { gearCategories, gearTierMeta } from "@/lib/gear/items";

export type GearSuggestionVariant = "default" | "women";

export function getGearUpdates(): GearUpdates {
  return gearUpdatesData as GearUpdates;
}

export function getMergedSuggestions(
  categorySlug: string,
  fallback: GearSuggestion[],
  variant: GearSuggestionVariant = "default"
): GearSuggestionPick[] {
  const updates = getGearUpdates();
  const weekly =
    variant === "women"
      ? updates.womenSuggestionsByCategory?.[categorySlug]
      : updates.suggestionsByCategory?.[categorySlug];

  if (weekly?.length) {
    return weekly;
  }

  return fallback.map((pick) => ({ ...pick, weekly: false }));
}

export function getGearUpdatesCoverage(): {
  missingMain: string[];
  missingWomen: string[];
} {
  const updates = getGearUpdates();
  const missingMain = gearCategories
    .map((category) => category.slug)
    .filter((slug) => !updates.suggestionsByCategory?.[slug]?.length);
  const missingWomen = gearCategories
    .filter((category) => category.womenSuggestions?.length)
    .map((category) => category.slug)
    .filter((slug) => !updates.womenSuggestionsByCategory?.[slug]?.length);

  return { missingMain, missingWomen };
}

export function formatGearUpdatedAt(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function getCategoryTitle(slug: string): string {
  return gearCategories.find((c) => c.slug === slug)?.title ?? "Gear";
}

export type ThisWeekCatalogPick = GearSuggestionPick & {
  categorySlug: string;
  categoryTitle: string;
};

export function getThisWeeksCatalogPicks(
  updates: GearUpdates = getGearUpdates()
): ThisWeekCatalogPick[] {
  const picks: ThisWeekCatalogPick[] = [];

  for (const category of gearCategories) {
    const featured = updates.suggestionsByCategory?.[category.slug]?.find(
      (pick) => pick.weekly
    );
    if (!featured) continue;
    picks.push({
      ...featured,
      categorySlug: category.slug,
      categoryTitle: category.title,
    });
  }

  return picks;
}

export function getWeeklyTierSuggestions(tier: GearTier): GearTierSuggestion[] {
  const updates = getGearUpdates();
  const priceByName = new Map(
    Object.values(gearTierMeta).flatMap((meta) =>
      meta.suggestions.map((suggestion) => [suggestion.name, suggestion.price] as const)
    )
  );

  return gearTierMeta[tier].suggestions.map((pick) => {
    const featured = updates.suggestionsByCategory?.[pick.categorySlug]?.find(
      (item) => item.weekly
    );
    if (!featured) return pick;

    return {
      ...pick,
      name: featured.name,
      note: featured.note,
      price: priceByName.get(featured.name) ?? pick.price,
      weekly: true,
    };
  });
}
