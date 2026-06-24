import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { exchangeStravaCode, STRAVA_SCOPES } from "@/lib/strava";
import { syncStravaActivitiesForUser } from "@/lib/strava-sync";
import { SITE_URL } from "@/lib/site";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const baseUrl = SITE_URL;

  if (error) {
    return NextResponse.redirect(`${baseUrl}/dashboard?error=strava_denied`);
  }

  const cookieStore = await cookies();
  const savedState = cookieStore.get("strava_oauth_state")?.value;
  const userId = cookieStore.get("strava_user_id")?.value;

  cookieStore.delete("strava_oauth_state");
  cookieStore.delete("strava_user_id");

  if (!code || !state || state !== savedState || !userId) {
    return NextResponse.redirect(`${baseUrl}/dashboard?error=strava_invalid`);
  }

  try {
    const tokens = await exchangeStravaCode(code);

    await prisma.stravaAccount.upsert({
      where: { userId },
      create: {
        userId,
        athleteId: String(tokens.athlete.id),
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: new Date(tokens.expires_at * 1000),
        scope: STRAVA_SCOPES,
      },
      update: {
        athleteId: String(tokens.athlete.id),
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: new Date(tokens.expires_at * 1000),
        scope: STRAVA_SCOPES,
      },
    });

    if (tokens.athlete.firstname) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          name: `${tokens.athlete.firstname} ${tokens.athlete.lastname ?? ""}`.trim(),
        },
      });
    }

    let synced = 0;
    let planMatched = 0;
    try {
      const result = await syncStravaActivitiesForUser(userId);
      synced = result.synced;
      planMatched = result.planWorkoutsMatched;
    } catch {
      // OAuth succeeded; user can manual sync from dashboard
    }

    const params = new URLSearchParams({ connected: "strava" });
    if (synced > 0) params.set("synced", String(synced));
    if (planMatched > 0) params.set("planMatched", String(planMatched));

    return NextResponse.redirect(`${baseUrl}/dashboard?${params.toString()}`);
  } catch {
    return NextResponse.redirect(`${baseUrl}/dashboard?error=strava_failed`);
  }
}
