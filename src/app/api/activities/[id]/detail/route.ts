import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  calculateDecoupling,
  formatLaps,
  pickSplits,
  splitTrendSummary,
} from "@/lib/activity-detail";
import { formatActivityType } from "@/lib/activity-types";
import { formatElevationFeet, WORKOUT_TYPE_LABELS } from "@/lib/strava-training-load";
import {
  fetchStravaActivityDetail,
  fetchStravaActivityStreams,
  formatDistance,
  formatDuration,
  formatPace,
  getValidAccessToken,
} from "@/lib/strava";
import { getClientIp, rateLimitAsync } from "@/lib/security/rate-limit";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip = getClientIp(request);
  const limited = await rateLimitAsync(
    `activity-detail:${session.user.id}:${ip}`,
    20,
    60 * 1000
  );
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } }
    );
  }

  const { id } = await context.params;

  const activity = await prisma.activity.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!activity) {
    return NextResponse.json({ error: "Activity not found" }, { status: 404 });
  }

  const summary = {
    id: activity.id,
    name: activity.name,
    activityLabel: formatActivityType(activity.type, activity.name),
    type: activity.type,
    startDate: activity.startDate.toISOString(),
    distance: activity.distance,
    movingTime: activity.movingTime,
    distanceLabel: formatDistance(activity.distance),
    durationLabel: formatDuration(activity.movingTime),
    paceLabel: formatPace(activity.distance / activity.movingTime),
    averageHeartrate: activity.averageHeartrate,
    maxHeartrate: activity.maxHeartrate,
    elevationGain: activity.elevationGain,
    elevationLabel: formatElevationFeet(activity.elevationGain),
    averageCadence: activity.averageCadence,
    sufferScore: activity.sufferScore,
    workoutType: activity.workoutType,
    workoutTypeLabel:
      activity.workoutType != null
        ? WORKOUT_TYPE_LABELS[activity.workoutType] ?? "default"
        : null,
  };

  try {
    const accessToken = await getValidAccessToken(session.user.id);
    const [detail, streams] = await Promise.all([
      fetchStravaActivityDetail(accessToken, activity.stravaId),
      fetchStravaActivityStreams(accessToken, activity.stravaId),
    ]);

    const splits = pickSplits(detail.splits_standard, detail.splits_metric);
    const laps = formatLaps(detail.laps);
    const decoupling = calculateDecoupling(
      streams.heartrates,
      streams.velocities,
      streams.timeSeconds
    );

    return NextResponse.json({
      summary,
      splits,
      laps,
      splitTrend: splitTrendSummary(splits),
      decoupling,
    });
  } catch (err) {
    console.error("Activity detail error:", err);
    return NextResponse.json({
      summary,
      splits: [],
      laps: [],
      splitTrend: null,
      decoupling: {
        available: false,
        percent: null,
        label: "moderate",
        summary: "Could not load live splits from Strava. Showing saved summary only.",
        firstHalfPace: null,
        secondHalfPace: null,
        firstHalfHr: null,
        secondHalfHr: null,
      },
    });
  }
}
