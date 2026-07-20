import { NextResponse } from "next/server";
import {
  disconnectStrava,
  findUserIdByStravaAthleteId,
  syncStravaActivitiesForUser,
} from "@/lib/strava-sync";
import { getClientIp, rateLimitAsync } from "@/lib/security/rate-limit";
import { timingSafeStringEqual } from "@/lib/security/timing-safe";

export const runtime = "nodejs";

type StravaWebhookEvent = {
  aspect_type: "create" | "update" | "delete";
  event_time: number;
  object_id: number;
  object_type: "activity" | "athlete";
  owner_id: number;
  subscription_id: number;
  updates?: Record<string, string>;
};

/** Strava subscription validation (GET). */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const challenge = searchParams.get("hub.challenge");
  const verifyToken = searchParams.get("hub.verify_token");
  const expected = process.env.STRAVA_WEBHOOK_VERIFY_TOKEN;

  if (
    mode === "subscribe" &&
    challenge &&
    expected &&
    verifyToken != null &&
    timingSafeStringEqual(verifyToken, expected)
  ) {
    return NextResponse.json({ "hub.challenge": challenge });
  }

  return NextResponse.json({ error: "Invalid verification" }, { status: 403 });
}

/** Strava activity / deauth events (POST). */
export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = await rateLimitAsync(`strava-webhook:${ip}`, 60, 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfter) },
      }
    );
  }

  let event: StravaWebhookEvent;

  try {
    event = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const expectedSubId = process.env.STRAVA_WEBHOOK_SUBSCRIPTION_ID;

  if (process.env.NODE_ENV !== "development" && !expectedSubId) {
    console.error("STRAVA_WEBHOOK_SUBSCRIPTION_ID is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  if (
    expectedSubId &&
    !timingSafeStringEqual(String(event.subscription_id), expectedSubId)
  ) {
    return NextResponse.json({ error: "Invalid subscription" }, { status: 403 });
  }

  try {
    const athleteId = String(event.owner_id);
    const athleteLimited = await rateLimitAsync(
      `strava-webhook-athlete:${athleteId}`,
      30,
      60 * 60 * 1000
    );
    if (!athleteLimited.ok) {
      return NextResponse.json(
        { error: "Too many webhook events for athlete" },
        {
          status: 429,
          headers: { "Retry-After": String(athleteLimited.retryAfter) },
        }
      );
    }

    const userId = await findUserIdByStravaAthleteId(athleteId);

    if (!userId) {
      return NextResponse.json({ received: true, skipped: "unknown_athlete" });
    }

    if (event.object_type === "athlete" && event.updates?.authorized === "false") {
      const disconnectLimited = await rateLimitAsync(
        `strava-webhook-disconnect:${athleteId}`,
        3,
        60 * 60 * 1000
      );
      if (!disconnectLimited.ok) {
        return NextResponse.json(
          { error: "Too many disconnect events" },
          {
            status: 429,
            headers: { "Retry-After": String(disconnectLimited.retryAfter) },
          }
        );
      }
      await disconnectStrava(userId);
      return NextResponse.json({ received: true, action: "disconnected" });
    }

    if (
      event.object_type === "activity" &&
      (event.aspect_type === "create" || event.aspect_type === "update")
    ) {
      await syncStravaActivitiesForUser(userId);
      return NextResponse.json({ received: true, action: "synced" });
    }
  } catch (err) {
    console.error("Strava webhook error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
