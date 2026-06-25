import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { syncStravaActivitiesForUser } from "@/lib/strava-sync";
import { isStravaConfigured } from "@/lib/strava";
import { getClientIp, rateLimit } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip = getClientIp(request);
  const limited = rateLimit(`strava-sync:${session.user.id}:${ip}`, 5, 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many sync requests. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } }
    );
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
    console.error("Strava sync error:", err);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
