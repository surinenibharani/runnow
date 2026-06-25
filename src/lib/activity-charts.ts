import type { ActivitySummary } from "@/lib/activity-fields";

export type PieSlice = {
  label: string;
  value: number;
  percent: number;
  color: string;
};

const ACTIVITY_COLORS: Record<string, string> = {
  Run: "#ea580c",
  "Trail Run": "#16a34a",
  "Virtual Run": "#0ea5e9",
  Ride: "#8b5cf6",
  Walk: "#eab308",
  Hike: "#78716c",
  Swim: "#06b6d4",
  Workout: "#f43f5e",
  Yoga: "#a855f7",
  Strength: "#64748b",
  Elliptical: "#14b8a6",
  Rowing: "#0284c7",
  Ski: "#38bdf8",
  "Paddle Sports": "#0891b2",
  "Virtual Ride": "#7c3aed",
  Other: "#94a3b8",
};

const ZONE_COLORS = {
  z1: "#3b82f6",
  z2: "#22c55e",
  z3: "#eab308",
  z4: "#f97316",
  z5: "#ef4444",
};

const ZONE_LABELS = {
  z1: "Zone 1 · Easy (<60%)",
  z2: "Zone 2 · Aerobic (60–70%)",
  z3: "Zone 3 · Tempo (70–80%)",
  z4: "Zone 4 · Threshold (80–90%)",
  z5: "Zone 5 · Max (90%+)",
};

function prettifyStravaType(type: string): string {
  return type
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
}

function formatActivityType(type: string): string {
  const t = type.toLowerCase();
  if (t.includes("virtual") && t.includes("run")) return "Virtual Run";
  if (t === "trailrun" || (t.includes("trail") && t.includes("run")))
    return "Trail Run";
  if (t.includes("virtual") && (t.includes("ride") || t.includes("bike")))
    return "Virtual Ride";
  if (t.includes("run")) return "Run";
  if (t.includes("ride") || t.includes("bike") || t.includes("cycl")) return "Ride";
  if (t.includes("walk")) return "Walk";
  if (t.includes("hike")) return "Hike";
  if (t.includes("swim")) return "Swim";
  if (t.includes("yoga")) return "Yoga";
  if (t.includes("weight") || t.includes("strength")) return "Strength";
  if (t.includes("workout") || t.includes("crossfit") || t.includes("hiit"))
    return "Workout";
  if (t.includes("elliptical")) return "Elliptical";
  if (t.includes("row")) return "Rowing";
  if (t.includes("ski")) return "Ski";
  if (t.includes("paddle") || t.includes("kayak") || t.includes("canoe"))
    return "Paddle Sports";
  const pretty = prettifyStravaType(type);
  return pretty || "Other";
}

function toSlices(
  entries: Map<string, number>,
  colorMap: Record<string, string>,
  defaultColor: string
): PieSlice[] {
  const total = [...entries.values()].reduce((sum, v) => sum + v, 0);
  if (total === 0) return [];

  return [...entries.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({
      label,
      value,
      percent: Math.round((value / total) * 100),
      color: colorMap[label] ?? defaultColor,
    }));
}

/** Activity count by Strava type (last synced batch). */
export function aggregateActivityTypes(
  activities: ActivitySummary[]
): PieSlice[] {
  const counts = new Map<string, number>();
  for (const activity of activities) {
    const label = formatActivityType(activity.type);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return toSlices(counts, ACTIVITY_COLORS, ACTIVITY_COLORS.Other);
}

function heartRateZone(
  avgHr: number,
  maxHr: number
): keyof typeof ZONE_LABELS {
  const pct = (avgHr / maxHr) * 100;
  if (pct < 60) return "z1";
  if (pct < 70) return "z2";
  if (pct < 80) return "z3";
  if (pct < 90) return "z4";
  return "z5";
}

/** Minutes in each HR zone, weighted by activity moving time. */
export function aggregateHeartRateZones(
  activities: Pick<ActivitySummary, "averageHeartrate" | "movingTime">[],
  age: number | null
): PieSlice[] {
  const maxHr = 220 - (age ?? 35);
  const minutes = new Map<string, number>();

  for (const activity of activities) {
    if (!activity.averageHeartrate || activity.movingTime <= 0) continue;
    const zone = heartRateZone(activity.averageHeartrate, maxHr);
    const label = ZONE_LABELS[zone];
    const mins = activity.movingTime / 60;
    minutes.set(label, (minutes.get(label) ?? 0) + mins);
  }

  const colorMap = Object.fromEntries(
    Object.entries(ZONE_LABELS).map(([key, label]) => [
      label,
      ZONE_COLORS[key as keyof typeof ZONE_COLORS],
    ])
  );

  const slices = toSlices(minutes, colorMap, "#94a3b8");
  return slices.map((s) => ({
    ...s,
    value: Math.round(s.value),
  }));
}
