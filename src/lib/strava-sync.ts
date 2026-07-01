import { prisma } from "@/lib/prisma";
import {
  analyzePlanAlignment,
  parseCompletedIdsFromDb,
} from "@/lib/plan-alignment";
import {
  buildRouteKey,
  fetchStravaActivities,
  fetchStravaActivityDetail,
  fetchStravaAthleteStats,
  getValidAccessToken,
} from "@/lib/strava";
import { resolveStravaActivityType } from "@/lib/activity-types";
import { getUserTrainingPlan, updateUserTrainingPlan } from "@/lib/teams";
import {
  mergeBestEfforts,
  parseBestEffortsCache,
} from "@/lib/strava-best-efforts";

export type StravaSyncResult = {
  synced: number;
  planWorkoutsMatched: number;
};

function isRunType(type: string): boolean {
  const t = type.toLowerCase();
  return t.includes("run") || t === "trailrun" || t === "virtualrun";
}

function activityUpsertData(
  activity: Awaited<ReturnType<typeof fetchStravaActivities>>[number],
  userId: string,
  activityType: string,
  routeKey: string | null,
  startLat: number | null,
  startLng: number | null
) {
  return {
    stravaId: String(activity.id),
    userId,
    name: activity.name,
    type: activityType,
    distance: activity.distance,
    movingTime: activity.moving_time,
    elapsedTime: activity.elapsed_time,
    averageSpeed: activity.average_speed ?? null,
    averageHeartrate: activity.average_heartrate ?? null,
    maxHeartrate: activity.max_heartrate ?? null,
    elevationGain: activity.total_elevation_gain ?? null,
    averageCadence: activity.average_cadence ?? null,
    sufferScore: activity.suffer_score ?? null,
    workoutType: activity.workout_type ?? null,
    startDate: new Date(activity.start_date),
    startLat,
    startLng,
    routeKey,
    polyline: activity.map?.summary_polyline ?? null,
  };
}

async function syncAthleteStatsAndBestEfforts(
  userId: string,
  accessToken: string
): Promise<void> {
  const account = await prisma.stravaAccount.findUnique({ where: { userId } });
  if (!account) return;

  try {
    const stats = await fetchStravaAthleteStats(accessToken, account.athleteId);
    await prisma.stravaAccount.update({
      where: { userId },
      data: {
        recentRunDistance: stats.recent_run_totals.distance,
        recentRunCount: stats.recent_run_totals.count,
        ytdRunDistance: stats.ytd_run_totals.distance,
        statsFetchedAt: new Date(),
      },
    });
  } catch {
    // Optional enrichment
  }

  const recentRuns = await prisma.activity.findMany({
    where: { userId },
    orderBy: { startDate: "desc" },
    take: 12,
    select: { stravaId: true, type: true, distance: true },
  });

  let efforts = parseBestEffortsCache(account.bestEffortsCache);
  let detailFetches = 0;

  for (const run of recentRuns) {
    if (!isRunType(run.type) || run.distance < 1609) continue;
    if (detailFetches >= 6) break;

    try {
      const detail = await fetchStravaActivityDetail(accessToken, run.stravaId);
      if (detail.best_efforts?.length) {
        efforts = mergeBestEfforts(efforts, detail.best_efforts, run.stravaId);
      }
      detailFetches++;
    } catch {
      // Skip failed detail fetch
    }
  }

  if (detailFetches > 0 || account.bestEffortsCache == null) {
    await prisma.stravaAccount.update({
      where: { userId },
      data: { bestEffortsCache: efforts },
    });
  }
}

export async function syncStravaActivitiesForUser(
  userId: string
): Promise<StravaSyncResult> {
  const accessToken = await getValidAccessToken(userId);
  let page = 1;
  let synced = 0;
  const maxPages = 20;

  while (page <= maxPages) {
    const activities = await fetchStravaActivities(accessToken, page, 50);
    if (activities.length === 0) break;

    for (const activity of activities) {
      const startLat = activity.start_latlng?.[0];
      const startLng = activity.start_latlng?.[1];
      const routeKey = buildRouteKey(startLat, startLng, activity.distance);
      const activityType = resolveStravaActivityType(activity);
      const data = activityUpsertData(
        activity,
        userId,
        activityType,
        routeKey,
        startLat ?? null,
        startLng ?? null
      );

      await prisma.activity.upsert({
        where: { stravaId: String(activity.id) },
        create: data,
        update: {
          name: data.name,
          type: data.type,
          distance: data.distance,
          movingTime: data.movingTime,
          elapsedTime: data.elapsedTime,
          averageSpeed: data.averageSpeed,
          averageHeartrate: data.averageHeartrate,
          maxHeartrate: data.maxHeartrate,
          elevationGain: data.elevationGain,
          averageCadence: data.averageCadence,
          sufferScore: data.sufferScore,
          workoutType: data.workoutType,
          routeKey: data.routeKey,
          polyline: data.polyline,
        },
      });
      synced++;
    }

    if (activities.length < 50) break;
    page++;
  }

  await prisma.stravaAccount.update({
    where: { userId },
    data: { lastSyncedAt: new Date() },
  });

  await syncAthleteStatsAndBestEfforts(userId, accessToken);

  const planWorkoutsMatched = await mergeStravaPlanCompletions(userId);

  return { synced, planWorkoutsMatched };
}

/** Mark plan workouts complete when Strava activities match scheduled days. */
export async function mergeStravaPlanCompletions(userId: string): Promise<number> {
  const trainingPlan = await getUserTrainingPlan(userId);
  if (!trainingPlan) return 0;

  const activities = await prisma.activity.findMany({
    where: { userId },
    orderBy: { startDate: "desc" },
    take: 100,
  });

  const alignment = analyzePlanAlignment({
    planId: trainingPlan.planId,
    currentWeek: trainingPlan.currentWeek,
    restDay: trainingPlan.restDay,
    longRunDay: trainingPlan.longRunDay,
    runDaysPerWeek: trainingPlan.runDaysPerWeek,
    completedIds: trainingPlan.completedIds,
    activities,
  });

  if (!alignment) return 0;

  const stravaDayIds = alignment.days
    .filter((d) => d.stravaMatch && d.kind !== "rest")
    .map((d) => d.dayId);

  if (stravaDayIds.length === 0) return 0;

  const current = parseCompletedIdsFromDb(trainingPlan.completedIds);
  const merged = [...new Set([...current, ...stravaDayIds])];

  if (merged.length === current.length) return 0;

  await updateUserTrainingPlan(userId, { completedIds: merged });
  return merged.length - current.length;
}

export async function findUserIdByStravaAthleteId(
  athleteId: string
): Promise<string | null> {
  const account = await prisma.stravaAccount.findFirst({
    where: { athleteId: String(athleteId) },
    select: { userId: true },
  });
  return account?.userId ?? null;
}

export async function disconnectStrava(userId: string): Promise<void> {
  await prisma.stravaAccount.deleteMany({ where: { userId } });
}
