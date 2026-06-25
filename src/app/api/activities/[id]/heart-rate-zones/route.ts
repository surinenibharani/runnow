import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { aggregateHeartRateZonesFromStream } from "@/lib/activity-charts";
import { buildAthleteProfile } from "@/lib/athlete-profile";
import {
  fetchStravaActivityHeartrateStream,
  getValidAccessToken,
} from "@/lib/strava";
import { getClientIp, rateLimit } from "@/lib/security/rate-limit";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip = getClientIp(request);
  const limited = rateLimit(
    `activity-hr-zones:${session.user.id}:${ip}`,
    30,
    60 * 1000
  );
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } }
    );
  }

  const { id } = await context.params;

  const [activity, user, latestWellness] = await Promise.all([
    prisma.activity.findFirst({
      where: { id, userId: session.user.id },
      select: {
        id: true,
        stravaId: true,
        name: true,
        averageHeartrate: true,
        movingTime: true,
      },
    }),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { age: true, gender: true, weightKg: true, heightCm: true },
    }),
    prisma.dailyWellness.findFirst({
      where: {
        userId: session.user.id,
        restingHeartRate: { not: null },
      },
      orderBy: { date: "desc" },
      select: { restingHeartRate: true },
    }),
  ]);

  if (!activity) {
    return NextResponse.json({ error: "Activity not found" }, { status: 404 });
  }

  const hrProfile = buildAthleteProfile(
    {
      age: user?.age ?? null,
      gender: user?.gender ?? null,
      weightKg: user?.weightKg ?? null,
      heightCm: user?.heightCm ?? null,
    },
    latestWellness?.restingHeartRate ?? null
  );

  try {
    const accessToken = await getValidAccessToken(session.user.id);
    const { heartrates, timeSeconds } = await fetchStravaActivityHeartrateStream(
      accessToken,
      activity.stravaId
    );

    if (heartrates.length === 0) {
      return NextResponse.json({
        zones: [],
        source: "none",
        message:
          "No heart rate stream for this activity. Use a watch or chest strap with HR recording enabled.",
      });
    }

    const zones = aggregateHeartRateZonesFromStream(
      heartrates,
      timeSeconds,
      hrProfile
    );

    return NextResponse.json({
      zones,
      source: "stream",
      sampleCount: heartrates.length,
      activityName: activity.name,
      hrZoneMethod: hrProfile.restingHeartRate ? "karvonen" : "percent_max",
    });
  } catch (err) {
    console.error("Activity HR zones error:", err);
    return NextResponse.json(
      { error: "Could not load heart rate data from Strava." },
      { status: 502 }
    );
  }
}
