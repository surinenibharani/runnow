import { formatPace } from "@/lib/strava";
import type { StravaActivityLap, StravaSplit } from "@/lib/strava";

const MILE_METERS = 1609.34;

export type ActivitySplitRow = {
  index: number;
  label: string;
  distanceMeters: number;
  movingTimeSeconds: number;
  pace: string;
  averageHeartrate: number | null;
  elevationDifference: number | null;
};

export type ActivityLapRow = {
  index: number;
  name: string;
  distanceMeters: number;
  movingTimeSeconds: number;
  pace: string;
  averageHeartrate: number | null;
};

export type DecouplingInsight = {
  available: boolean;
  percent: number | null;
  label: "excellent" | "good" | "moderate" | "high";
  summary: string;
  firstHalfPace: string | null;
  secondHalfPace: string | null;
  firstHalfHr: number | null;
  secondHalfHr: number | null;
};

function paceFromSpeed(speedMps: number | undefined, distanceM: number, timeS: number): string {
  const speed = speedMps && speedMps > 0 ? speedMps : distanceM / timeS;
  if (!speed || speed <= 0) return "—";
  return formatPace(speed);
}

export function formatSplits(splits: StravaSplit[] | undefined): ActivitySplitRow[] {
  if (!splits?.length) return [];

  return splits.map((split, index) => ({
    index: index + 1,
    label: `Mi ${index + 1}`,
    distanceMeters: split.distance,
    movingTimeSeconds: split.moving_time,
    pace: paceFromSpeed(split.average_speed, split.distance, split.moving_time),
    averageHeartrate: split.average_heartrate ?? null,
    elevationDifference: split.elevation_difference ?? null,
  }));
}

export function formatMetricSplits(splits: StravaSplit[] | undefined): ActivitySplitRow[] {
  if (!splits?.length) return [];

  return splits.map((split, index) => ({
    index: index + 1,
    label: `Km ${index + 1}`,
    distanceMeters: split.distance,
    movingTimeSeconds: split.moving_time,
    pace: paceFromSpeed(split.average_speed, split.distance, split.moving_time),
    averageHeartrate: split.average_heartrate ?? null,
    elevationDifference: split.elevation_difference ?? null,
  }));
}

export function formatLaps(laps: StravaActivityLap[] | undefined): ActivityLapRow[] {
  if (!laps?.length) return [];

  return laps.map((lap) => ({
    index: lap.lap_index,
    name: lap.name || `Lap ${lap.lap_index}`,
    distanceMeters: lap.distance,
    movingTimeSeconds: lap.moving_time,
    pace: paceFromSpeed(lap.average_speed, lap.distance, lap.moving_time),
    averageHeartrate: lap.average_heartrate ?? null,
  }));
}

function avg(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/**
 * Aerobic decoupling: HR/pace drift from first half to second half.
 * Positive % = HR rose relative to pace (typical fatigue on long efforts).
 */
export function calculateDecoupling(
  heartrates: number[],
  velocities: number[],
  timeSeconds: number[]
): DecouplingInsight {
  const unavailable: DecouplingInsight = {
    available: false,
    percent: null,
    label: "moderate",
    summary: "Need heart rate and pace streams for decoupling analysis.",
    firstHalfPace: null,
    secondHalfPace: null,
    firstHalfHr: null,
    secondHalfHr: null,
  };

  if (heartrates.length < 20 || velocities.length < 20) {
    return unavailable;
  }

  const pairs: { hr: number; velocity: number }[] = [];
  const len = Math.min(heartrates.length, velocities.length, timeSeconds.length);

  for (let i = 0; i < len; i++) {
    const hr = heartrates[i];
    const v = velocities[i];
    if (hr > 0 && v > 0.5) {
      pairs.push({ hr, velocity: v });
    }
  }

  if (pairs.length < 30) return unavailable;

  const midpoint = Math.floor(pairs.length / 2);
  const first = pairs.slice(0, midpoint);
  const second = pairs.slice(midpoint);

  const hr1 = avg(first.map((p) => p.hr))!;
  const hr2 = avg(second.map((p) => p.hr))!;
  const v1 = avg(first.map((p) => p.velocity))!;
  const v2 = avg(second.map((p) => p.velocity))!;

  const ratio1 = hr1 / v1;
  const ratio2 = hr2 / v2;
  const percent = ((ratio2 / ratio1) - 1) * 100;

  let label: DecouplingInsight["label"] = "good";
  let summary: string;

  if (percent <= 5) {
    label = "excellent";
    summary =
      "Strong aerobic control — heart rate stayed efficient relative to pace across the run.";
  } else if (percent <= 10) {
    label = "good";
    summary =
      "Normal drift for a steady effort. Typical for long runs and warm weather.";
  } else if (percent <= 15) {
    label = "moderate";
    summary =
      "Noticeable HR/pace decoupling — fatigue, heat, hills, or starting a bit fast.";
  } else {
    label = "high";
    summary =
      "High decoupling — you may have gone out hard or need more aerobic base. Extra easy days help.";
  }

  return {
    available: true,
    percent: Math.round(percent * 10) / 10,
    label,
    summary,
    firstHalfPace: formatPace(v1),
    secondHalfPace: formatPace(v2),
    firstHalfHr: Math.round(hr1),
    secondHalfHr: Math.round(hr2),
  };
}

export function pickSplits(
  splitsStandard?: StravaSplit[],
  splitsMetric?: StravaSplit[]
): ActivitySplitRow[] {
  const imperial = formatSplits(splitsStandard);
  if (imperial.length > 0) return imperial;
  return formatMetricSplits(splitsMetric);
}

export function splitTrendSummary(splits: ActivitySplitRow[]): string | null {
  if (splits.length < 2) return null;

  const first = splits[0];
  const last = splits[splits.length - 1];
  const firstPaceSec = (first.movingTimeSeconds / first.distanceMeters) * MILE_METERS;
  const lastPaceSec = (last.movingTimeSeconds / last.distanceMeters) * MILE_METERS;
  const delta = lastPaceSec - firstPaceSec;

  if (delta >= 30) {
    return `Mile 1 was ${Math.round(delta)}s faster than mile ${splits.length} — classic positive split.`;
  }
  if (delta <= -15) {
    return `You negative-split nicely — final segment ${Math.round(Math.abs(delta))}s faster than the opener.`;
  }
  return "Even pacing across splits — well controlled.";
}
