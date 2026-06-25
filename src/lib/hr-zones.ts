import {
  estimateMaxHeartRate as estimateMaxHrFromProfile,
  formatProfileContext,
  getBmi,
  type AthleteProfile,
} from "@/lib/athlete-profile";

export type HrProfile = AthleteProfile;

export type HrZoneMethod = "karvonen" | "percent_max";

const ZONE_COLORS = {
  z1: "#3b82f6",
  z2: "#22c55e",
  z3: "#eab308",
  z4: "#f97316",
  z5: "#ef4444",
} as const;

const ZONE_LABELS_PERCENT_MAX = {
  z1: "Zone 1 · Easy (<60%)",
  z2: "Zone 2 · Aerobic (60–70%)",
  z3: "Zone 3 · Tempo (70–80%)",
  z4: "Zone 4 · Threshold (80–90%)",
  z5: "Zone 5 · Max (90%+)",
} as const;

const ZONE_LABELS_KARVONEN = {
  z1: "Zone 1 · Easy (<60% HRR)",
  z2: "Zone 2 · Aerobic (60–70% HRR)",
  z3: "Zone 3 · Tempo (70–80% HRR)",
  z4: "Zone 4 · Threshold (80–90% HRR)",
  z5: "Zone 5 · Max (90%+ HRR)",
} as const;

export type HrZoneKey = keyof typeof ZONE_COLORS;

export { estimateMaxHrFromProfile as estimateMaxHeartRate };

export function resolveHrZoneMethod(profile: HrProfile): HrZoneMethod {
  return profile.restingHeartRate != null && profile.restingHeartRate > 0
    ? "karvonen"
    : "percent_max";
}

export function classifyHeartRateZone(hr: number, profile: HrProfile): HrZoneKey {
  const maxHr = estimateMaxHrFromProfile(profile);

  if (
    profile.restingHeartRate != null &&
    profile.restingHeartRate > 0 &&
    profile.restingHeartRate < maxHr
  ) {
    const hrr = maxHr - profile.restingHeartRate;
    const pct = ((hr - profile.restingHeartRate) / hrr) * 100;
    if (pct < 60) return "z1";
    if (pct < 70) return "z2";
    if (pct < 80) return "z3";
    if (pct < 90) return "z4";
    return "z5";
  }

  const pct = (hr / maxHr) * 100;
  if (pct < 60) return "z1";
  if (pct < 70) return "z2";
  if (pct < 80) return "z3";
  if (pct < 90) return "z4";
  return "z5";
}

export function getZoneLabel(zone: HrZoneKey, method: HrZoneMethod): string {
  return method === "karvonen"
    ? ZONE_LABELS_KARVONEN[zone]
    : ZONE_LABELS_PERCENT_MAX[zone];
}

export function getZoneColor(zone: HrZoneKey): string {
  return ZONE_COLORS[zone];
}

export function buildZoneColorMap(method: HrZoneMethod): Record<string, string> {
  return Object.fromEntries(
    (Object.keys(ZONE_COLORS) as HrZoneKey[]).map((key) => [
      getZoneLabel(key, method),
      ZONE_COLORS[key],
    ])
  );
}

export function formatBmi(weightKg: number, heightCm: number): number | null {
  return getBmi({ age: null, gender: null, weightKg, heightCm, restingHeartRate: null });
}

export function formatHrZoneSubtitle(profile: HrProfile, extra?: string): string {
  const parts = formatProfileContext(profile);
  if (extra) parts.push(extra);
  return parts.join(" · ");
}

export function lbsToKg(lbs: number): number {
  return lbs * 0.45359237;
}

export function kgToLbs(kg: number): number {
  return kg / 0.45359237;
}

export function heightToCm(feet: number, inches: number): number {
  return feet * 30.48 + inches * 2.54;
}

export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches: inches === 12 ? 0 : inches };
}
