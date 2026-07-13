import type { ActivitySummary } from "@/lib/activity-fields";
import { startOfZonedYear, zonedDaysAgo } from "@/lib/date-keys";

const MILE_METERS = 1609.34;
const RECENT_DAYS = 28;

function isRunActivity(type: string): boolean {
  const t = type.toLowerCase();
  return t.includes("run") || t === "trailrun" || t === "virtualrun";
}

export type SyncedRunStats = {
  recentRunMiles: number;
  recentRunCount: number;
  ytdRunMiles: number;
  ytdRunCount: number;
  /** Totals always come from activities stored after Strava sync. */
  source: "synced";
};

/**
 * Running totals from synced Activity rows — matches what the dashboard lists,
 * unlike Strava's athlete/stats endpoint which can diverge (privacy, lag, partial sync).
 */
export function computeSyncedRunStats(
  activities: Pick<ActivitySummary, "type" | "distance" | "startDate">[],
  now: Date = new Date()
): SyncedRunStats {
  const recentStart = zonedDaysAgo(RECENT_DAYS - 1, now);
  const yearStart = startOfZonedYear(now);

  let recentMeters = 0;
  let recentCount = 0;
  let ytdMeters = 0;
  let ytdCount = 0;

  for (const activity of activities) {
    if (!isRunActivity(activity.type)) continue;
    if (activity.distance <= 0) continue;

    if (activity.startDate >= yearStart) {
      ytdMeters += activity.distance;
      ytdCount += 1;
    }
    if (activity.startDate >= recentStart) {
      recentMeters += activity.distance;
      recentCount += 1;
    }
  }

  return {
    recentRunMiles: recentMeters / MILE_METERS,
    recentRunCount: recentCount,
    ytdRunMiles: ytdMeters / MILE_METERS,
    ytdRunCount: ytdCount,
    source: "synced",
  };
}
