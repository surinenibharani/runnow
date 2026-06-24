import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStravaAuthUrl, isStravaConfigured } from "@/lib/strava";
import { SITE_URL } from "@/lib/site";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login?callbackUrl=/dashboard", SITE_URL));
  }

  if (!isStravaConfigured()) {
    return NextResponse.redirect(
      new URL("/dashboard?error=strava_not_configured", SITE_URL)
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