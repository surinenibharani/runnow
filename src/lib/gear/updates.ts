import type { GearSuggestion } from "@/lib/gear/items";
import type { GearSuggestionPick, GearUpdates } from "@/lib/gear/types";
import gearUpdatesData from "@/data/gear-updates.json";
import { gearCategories } from "@/lib/gear/items";

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
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getCategoryTitle(slug: string): string {
  return gearCategories.find((c) => c.slug === slug)?.title ?? "Gear";
}
