import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isStravaConfigured } from "@/lib/strava";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [account, activityCount] = await Promise.all([
    prisma.stravaAccount.findUnique({ where: { userId: session.user.id } }),
    prisma.activity.count({ where: { userId: session.user.id } }),
  ]);

  return NextResponse.json({
    configured: isStravaConfigured(),
    connected: !!account,
    athleteId: account?.athleteId ?? null,
    lastSyncedAt: account?.lastSyncedAt?.toISOString() ?? null,
    activityCount,
    stravaProfileUrl: account
      ? `https://www.strava.com/athletes/${account.athleteId}`
      : null,
  });
}
