import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { syncStravaActivitiesForUser } from "@/lib/strava-sync";
import { isStravaConfigured } from "@/lib/strava";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isStravaConfigured()) {
    return NextResponse.json(
      { error: "Strava is not configured. Add STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET to .env" },
      { status: 503 }
    );
  }

  const userId = session.user.id;

  try {
    const account = await prisma.stravaAccount.findUnique({ where: { userId } });
    if (!account) {
      return NextResponse.json({ error: "Strava not connected" }, { status: 400 });
    }

    const { synced, planWorkoutsMatched } = await syncStravaActivitiesForUser(userId);

    return NextResponse.json({
      synced,
      planWorkoutsMatched,
      message:
        planWorkoutsMatched > 0
          ? `Synced ${synced} runs · ${planWorkoutsMatched} plan workout(s) matched`
          : `Synced ${synced} runs`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sync failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
