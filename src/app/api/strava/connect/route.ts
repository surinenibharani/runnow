import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStravaAuthUrl } from "@/lib/strava";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", process.env.AUTH_URL));
  }

  if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_CLIENT_SECRET) {
    return NextResponse.json(
      { error: "Strava is not configured. Add STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET to .env" },
      { status: 503 }
    );
  }

  const state = randomBytes(16).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set("strava_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });
  cookieStore.set("strava_user_id", session.user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });

  return NextResponse.redirect(getStravaAuthUrl(state));
}
