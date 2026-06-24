import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  getValidAccessToken,
  fetchStravaActivities,
  buildRouteKey,
  isRunType,
} from "@/lib/strava";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
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
        const routeKey = buildRouteKey(
          startLat,
          startLng,
          activity.distance
        );

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

    return NextResponse.json({ synced, message: `Synced ${synced} runs` });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sync failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
