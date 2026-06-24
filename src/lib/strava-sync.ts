import { prisma } from "@/lib/prisma";
import {
  analyzePlanAlignment,
  parseCompletedIdsFromDb,
} from "@/lib/plan-alignment";
import {
  buildRouteKey,
  fetchStravaActivities,
  getValidAccessToken,
  isRunType,
} from "@/lib/strava";
import { getOrCreateUserTrainingPlan, updateUserTrainingPlan } from "@/lib/teams";

export type StravaSyncResult = {
  synced: number;
  planWorkoutsMatched: number;
};

export async function syncStravaActivitiesForUser(
  userId: string
): Promise<StravaSyncResult> {
  const accessToken = await getValidAccessToken(userId);
  let page = 1;
  let synced = 0;
  const maxPages = 5;

  while (page <= maxPages) {
    const activities = await fetchStravaActivities(accessToken, page, 50);
    if (activities.length === 0) break;

    for (const activity of activities) {
      if (!isRunType(activity.type)) continue;

      const startLat = activity.start_latlng?.[0];
      const startLng = activity.start_latlng?.[1];
      const routeKey = buildRouteKey(startLat, startLng, activity.distance);

      await prisma.activity.upsert({
        where: { stravaId: String(activity.id) },
        create: {
          stravaId: String(activity.id),
          userId,
          name: activity.name,
          type: activity.type,
          distance: activity.distance,
          movingTime: activity.moving_time,
          elapsedTime: activity.elapsed_time,
          averageSpeed: activity.average_speed ?? null,
          averageHeartrate: activity.average_heartrate ?? null,
          maxHeartrate: activity.max_heartrate ?? null,
          startDate: new Date(activity.start_date),
          startLat: startLat ?? null,
          startLng: startLng ?? null,
          routeKey,
          polyline: activity.map?.summary_polyline ?? null,
        },
        update: {
          name: activity.name,
          type: activity.type,
          distance: activity.distance,
          movingTime: activity.moving_time,
          elapsedTime: activity.elapsed_time,
          averageSpeed: activity.average_speed ?? null,
          averageHeartrate: activity.average_heartrate ?? null,
          maxHeartrate: activity.max_heartrate ?? null,
          routeKey,
          polyline: activity.map?.summary_polyline ?? null,
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

  const planWorkoutsMatched = await mergeStravaPlanCompletions(userId);

  return { synced, planWorkoutsMatched };
}

/** Mark plan workouts complete when Strava activities match scheduled days. */
export async function mergeStravaPlanCompletions(userId: string): Promise<number> {
  const [trainingPlan, activities] = await Promise.all([
    getOrCreateUserTrainingPlan(userId),
    prisma.activity.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
      take: 100,
    }),
  ]);

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
