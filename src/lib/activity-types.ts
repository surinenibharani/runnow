/** Strava activity colors for charts (shared). */
export const ACTIVITY_COLORS: Record<string, string> = {
  Run: "#ea580c",
  "Trail Run": "#16a34a",
  "Virtual Run": "#0ea5e9",
  Ride: "#8b5cf6",
  "E-Bike Ride": "#a78bfa",
  Walk: "#eab308",
  Hike: "#78716c",
  Swim: "#06b6d4",
  Workout: "#f43f5e",
  Yoga: "#a855f7",
  Pilates: "#c084fc",
  Strength: "#64748b",
  Elliptical: "#14b8a6",
  Rowing: "#0284c7",
  Ski: "#38bdf8",
  "Paddle Sports": "#0891b2",
  "Virtual Ride": "#7c3aed",
  Golf: "#84cc16",
  Other: "#94a3b8",
};

function prettifyStravaType(type: string): string {
  return type
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
}

/** Prefer Strava `sport_type` — legacy `type` often says "Workout" for yoga, pilates, etc. */
export function resolveStravaActivityType(activity: {
  type?: string | null;
  sport_type?: string | null;
}): string {
  const sportType = activity.sport_type?.trim();
  if (sportType) return sportType;
  return activity.type?.trim() || "Workout";
}

function inferTypeFromName(name: string): string | null {
  const n = name.toLowerCase();
  if (n.includes("yoga")) return "Yoga";
  if (n.includes("pilates")) return "Pilates";
  if (
    n.includes("strength") ||
    n.includes("weight") ||
    n.includes("lifting") ||
    n.includes("gym")
  ) {
    return "Strength";
  }
  if (n.includes("crossfit") || n.includes("hiit")) return "Workout";
  if (n.includes("elliptical")) return "Elliptical";
  if (n.includes("row")) return "Rowing";
  if (n.includes("hike")) return "Hike";
  if (n.includes("walk")) return "Walk";
  if (n.includes("swim")) return "Swim";
  if (n.includes("golf")) return "Golf";
  return null;
}

export function formatActivityType(type: string, name?: string): string {
  const t = type.toLowerCase().replace(/\s+/g, "");

  // Legacy sync stored yoga/pilates as generic "Workout"
  if ((t === "workout" || t === "") && name) {
    const inferred = inferTypeFromName(name);
    if (inferred) return inferred;
  }

  if (t.includes("virtual") && t.includes("run")) return "Virtual Run";
  if (t === "trailrun" || (t.includes("trail") && t.includes("run")))
    return "Trail Run";
  if (t.includes("run")) return "Run";

  if (t.includes("virtual") && (t.includes("ride") || t.includes("bike")))
    return "Virtual Ride";
  if (t.includes("ebike") || t === "emountainbikeride") return "E-Bike Ride";
  if (t.includes("ride") || t.includes("bike") || t.includes("cycl")) return "Ride";

  if (t.includes("walk")) return "Walk";
  if (t.includes("hike")) return "Hike";
  if (t.includes("swim")) return "Swim";

  if (t.includes("yoga")) return "Yoga";
  if (t.includes("pilates")) return "Pilates";

  if (
    t.includes("weight") ||
    t.includes("strength") ||
    t === "highintensityintervaltraining"
  ) {
    return "Strength";
  }
  if (t.includes("crossfit") || t.includes("hiit")) return "Workout";

  if (t.includes("elliptical") || t.includes("stairstepper")) return "Elliptical";
  if (t.includes("row")) return "Rowing";
  if (t.includes("ski") || t.includes("snowboard")) return "Ski";
  if (
    t.includes("paddle") ||
    t.includes("kayak") ||
    t.includes("canoe") ||
    t.includes("standup")
  ) {
    return "Paddle Sports";
  }
  if (t.includes("golf")) return "Golf";

  if (t.includes("workout")) return "Workout";

  const pretty = prettifyStravaType(type);
  return pretty || "Other";
}

export function getActivityColor(label: string): string {
  return ACTIVITY_COLORS[label] ?? ACTIVITY_COLORS.Other;
}
