import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { exchangeStravaCode } from "@/lib/strava";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const baseUrl = process.env.AUTH_URL ?? "http://localhost:3000";

  if (error) {
    return NextResponse.redirect(
      `${baseUrl}/dashboard?error=strava_denied`
    );
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
        scope: "read,activity:read_all,profile:read_all",
      },
      update: {
        athleteId: String(tokens.athlete.id),
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: new Date(tokens.expires_at * 1000),
      },
    });

    if (tokens.athlete.firstname && !tokens.athlete.username) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          name: `${tokens.athlete.firstname} ${tokens.athlete.lastname ?? ""}`.trim(),
        },
      });
    }

    return NextResponse.redirect(`${baseUrl}/dashboard?connected=strava`);
  } catch {
    return NextResponse.redirect(`${baseUrl}/dashboard?error=strava_failed`);
  }
}
