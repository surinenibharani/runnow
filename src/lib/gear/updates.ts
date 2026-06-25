import type { GearSuggestion } from "@/lib/gear/items";
import type { GearSuggestionPick, GearUpdates } from "@/lib/gear/types";
import gearUpdatesData from "@/data/gear-updates.json";
import { gearCategories } from "@/lib/gear/items";

export function getGearUpdates(): GearUpdates {
  return gearUpdatesData as GearUpdates;
}

export function getMergedSuggestions(
  categorySlug: string,
  fallback: GearSuggestion[]
): GearSuggestionPick[] {
  const updates = getGearUpdates();
  const weekly = updates.suggestionsByCategory?.[categorySlug];
  if (weekly?.length) {
    return weekly;
  }
  return fallback.map((pick) => ({ ...pick, weekly: false }));
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
