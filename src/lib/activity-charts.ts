import type { ActivitySummary } from "@/lib/activity-fields";
import {
  ACTIVITY_COLORS,
  formatActivityType,
} from "@/lib/activity-types";
import {
  buildZoneColorMap,
  classifyHeartRateZone,
  getZoneLabel,
  resolveHrZoneMethod,
  type HrProfile,
} from "@/lib/hr-zones";

export type PieSlice = {
  label: string;
  value: number;
  percent: number;
  color: string;
};

export { formatActivityType, ACTIVITY_COLORS };

function toSlices(
  entries: Map<string, number>,
  colorMap: Record<string, string>,
  defaultColor: string,
  percentDecimals = 0
): PieSlice[] {
  const total = [...entries.values()].reduce((sum, v) => sum + v, 0);
  if (total === 0) return [];

  const percentFactor = 10 ** percentDecimals;

  return [...entries.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({
      label,
      value,
      percent:
        percentDecimals > 0
          ? Math.round((value / total) * 100 * percentFactor) / percentFactor
          : Math.round((value / total) * 100),
      color: colorMap[label] ?? defaultColor,
    }));
}

/** Activity count by type (all activities in the selected period). */
export function aggregateActivityTypes(
  activities: ActivitySummary[]
): PieSlice[] {
  const counts = new Map<string, number>();
  for (const activity of activities) {
    const label = formatActivityType(activity.type, activity.name);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return toSlices(counts, ACTIVITY_COLORS, ACTIVITY_COLORS.Other);
}

function zoneSlicesFromMinutes(
  minutes: Map<string, number>,
  profile: HrProfile
): PieSlice[] {
  const method = resolveHrZoneMethod(profile);
  const colorMap = buildZoneColorMap(method);
  const slices = toSlices(minutes, colorMap, "#94a3b8", 1);
  return slices.map((s) => ({
    ...s,
    value: Math.round(s.value * 10) / 10,
  }));
}

function accumulateZoneMinutes(
  minutes: Map<string, number>,
  hr: number,
  durationSec: number,
  profile: HrProfile
): void {
  const zone = classifyHeartRateZone(hr, profile);
  const label = getZoneLabel(zone, resolveHrZoneMethod(profile));
  minutes.set(label, (minutes.get(label) ?? 0) + durationSec / 60);
}

/** Minutes in each HR zone from per-second Strava heartrate stream data. */
export function aggregateHeartRateZonesFromStream(
  heartrates: number[],
  timeSeconds: number[] | null,
  profile: HrProfile
): PieSlice[] {
  const minutes = new Map<string, number>();

  for (let i = 0; i < heartrates.length; i++) {
    const hr = heartrates[i];
    if (!hr || hr <= 0) continue;

    let durationSec = 1;
    if (timeSeconds && timeSeconds.length === heartrates.length) {
      durationSec =
        i === 0
          ? Math.max(timeSeconds[0], 1)
          : Math.max(timeSeconds[i] - timeSeconds[i - 1], 0.5);
    }

    accumulateZoneMinutes(minutes, hr, durationSec, profile);
  }

  return zoneSlicesFromMinutes(minutes, profile);
}

/** Minutes in each HR zone, weighted by activity moving time. */
export function aggregateHeartRateZones(
  activities: Pick<ActivitySummary, "averageHeartrate" | "movingTime">[],
  profile: HrProfile
): PieSlice[] {
  const minutes = new Map<string, number>();

  for (const activity of activities) {
    if (!activity.averageHeartrate || activity.movingTime <= 0) continue;
    accumulateZoneMinutes(
      minutes,
      activity.averageHeartrate,
      activity.movingTime,
      profile
    );
  }

  return zoneSlicesFromMinutes(minutes, profile);
}
