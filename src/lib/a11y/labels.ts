import type { TipIllustrationId } from "@/lib/tips/tips";

/** Accessible names for decorative SVG illustrations (gear, plans, tips). */
export const GEAR_ILLUSTRATION_LABELS: Record<string, string> = {
  shoes: "Running shoes illustration",
  shirts: "Running shirt illustration",
  bottoms: "Running shorts illustration",
  tights: "Running tights illustration",
  cap: "Running cap illustration",
  goggles: "Running sunglasses illustration",
  sunscreen: "Sunscreen for runners illustration",
  "chafing-creams": "Anti-chafe product illustration",
  "hydration-tablets": "Hydration tablets illustration",
  gels: "Energy gel illustration",
  "hydration-packs": "Hydration vest illustration",
  "apple-watch": "Apple Watch illustration",
  garmin: "Garmin watch illustration",
  coros: "COROS watch illustration",
  "strava-app": "Strava app illustration",
};

export const GEAR_GROUP_LABELS: Record<string, string> = {
  Apparel: "Running apparel category illustration",
  "Tracking & Apps": "GPS watches and running apps illustration",
  Accessories: "Running accessories illustration",
  "Hydration & Fuel": "Hydration and fuel illustration",
};

export const PLAN_FAMILY_LABELS: Record<string, string> = {
  "5k": "Couch to 5K training path illustration",
  "10k": "10K training path illustration",
  "half-marathon": "Half marathon training path illustration",
  "full-marathon": "Marathon training path illustration",
};

export const TIP_ILLUSTRATION_LABELS: Record<TipIllustrationId, string> = {
  "easy-pace": "Easy pace running illustration",
  shoes: "Running shoes illustration",
  calendar: "Training schedule illustration",
  hydration: "Hydration illustration",
  recovery: "Rest and recovery illustration",
  breathing: "Breathing rhythm illustration",
  mindset: "Runner mindset illustration",
  warmup: "Warm-up illustration",
  rain: "Rainy run illustration",
  heat: "Hot weather run illustration",
  cold: "Cold weather run illustration",
  storm: "Stormy weather illustration",
  wind: "Windy run illustration",
  "air-quality": "Air quality illustration",
  indoor: "Indoor workout illustration",
  pregnancy: "Running during pregnancy illustration",
  senior: "Running for older adults illustration",
  health: "Running with health conditions illustration",
};

export function gearIllustrationLabel(slug: string, title?: string): string {
  return GEAR_ILLUSTRATION_LABELS[slug] ?? `${title ?? "Gear"} illustration`;
}

export function planFamilyIllustrationLabel(familyId: string, name?: string): string {
  return PLAN_FAMILY_LABELS[familyId] ?? `${name ?? "Training plan"} illustration`;
}

export function tipIllustrationLabel(id: TipIllustrationId, title?: string): string {
  return TIP_ILLUSTRATION_LABELS[id] ?? `${title ?? "Tip"} illustration`;
}

/** Build a screen-reader-friendly summary for chart data. */
export function chartDataSummary(
  slices: Array<{ label: string; value: number; percent: number }>,
  totalLabel: string
): string {
  if (slices.length === 0) return `No ${totalLabel} data`;
  const parts = slices.map((s) => `${s.label} ${s.percent}%`).join(", ");
  return `${totalLabel}: ${parts}`;
}
