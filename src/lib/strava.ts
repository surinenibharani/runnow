import { SITE_URL } from "@/lib/site";
import {
  maybeReencryptStravaTokens,
  readStoredTokenPair,
  writeStoredTokenPair,
} from "@/lib/strava-tokens";

const STRAVA_AUTH_URL = "https://www.strava.com/oauth/authorize";
const STRAVA_TOKEN_URL = "https://www.strava.com/oauth/token";
const STRAVA_API = "https://www.strava.com/api/v3";

export const STRAVA_SCOPES = "read,activity:read_all,profile:read_all";

export interface StravaTokenResponse {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: {
    id: number;
    username?: string;
    firstname?: string;
    lastname?: string;
  };
}

export interface StravaActivity {
  id: number;
  name: string;
  type: string;
  sport_type?: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  average_speed?: number;
  average_heartrate?: number;
  max_heartrate?: number;
  total_elevation_gain?: number;
  average_cadence?: number;
  suffer_score?: number;
  workout_type?: number;
  start_date: string;
  start_latlng?: [number, number];
  map?: { summary_polyline?: string };
}

export interface StravaActivityLap {
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  average_speed?: number;
  average_heartrate?: number;
  lap_index: number;
}

export interface StravaSplit {
  distance: number;
  elapsed_time: number;
  moving_time: number;
  average_speed?: number;
  average_heartrate?: number;
  elevation_difference?: number;
  pace_zone?: number;
}

export interface StravaBestEffort {
  name: string;
  distance: number;
  elapsed_time: number;
  moving_time: number;
  start_date: string;
  pr_rank?: number | null;
}

export interface StravaActivityDetail extends StravaActivity {
  laps?: StravaActivityLap[];
  splits_metric?: StravaSplit[];
  splits_standard?: StravaSplit[];
  best_efforts?: StravaBestEffort[];
}

export interface StravaActivityTotals {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
}

export interface StravaAthleteStats {
  recent_run_totals: StravaActivityTotals;
  ytd_run_totals: StravaActivityTotals;
  all_run_totals: StravaActivityTotals;
}

export interface StravaAthlete {
  id: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  sex?: string;
  weight?: number;
  profile?: string;
}

export function isStravaConfigured(): boolean {
  return !!(process.env.STRAVA_CLIENT_ID && process.env.STRAVA_CLIENT_SECRET);
}

export function getStravaRedirectUri(): string {
  return `${SITE_URL}/api/strava/callback`;
}

export function getStravaAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.STRAVA_CLIENT_ID!,
    redirect_uri: getStravaRedirectUri(),
    response_type: "code",
    approval_prompt: "auto",
    scope: STRAVA_SCOPES,
    state,
  });
  return `${STRAVA_AUTH_URL}?${params}`;
}

export async function exchangeStravaCode(
  code: string
): Promise<StravaTokenResponse> {
  const res = await fetch(STRAVA_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
    }),
  });

  if (!res.ok) {
    throw new Error(`Strava token exchange failed: ${res.status}`);
  }

  return res.json();
}

export async function refreshStravaToken(
  refreshToken: string
): Promise<StravaTokenResponse> {
  const res = await fetch(STRAVA_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) {
    throw new Error(`Strava token refresh failed: ${res.status}`);
  }

  return res.json();
}

export async function getValidAccessToken(userId: string): Promise<string> {
  const { prisma } = await import("@/lib/prisma");
  const account = await prisma.stravaAccount.findUnique({ where: { userId } });

  if (!account) {
    throw new Error("Strava not connected");
  }

  const now = new Date();
  const tokens = readStoredTokenPair(account);

  if (account.expiresAt > now) {
    await maybeReencryptStravaTokens(userId);
    return tokens.accessToken;
  }

  const refreshed = await refreshStravaToken(tokens.refreshToken);
  const encrypted = writeStoredTokenPair({
    accessToken: refreshed.access_token,
    refreshToken: refreshed.refresh_token,
  });
  await prisma.stravaAccount.update({
    where: { userId },
    data: {
      accessToken: encrypted.accessToken,
      refreshToken: encrypted.refreshToken,
      expiresAt: new Date(refreshed.expires_at * 1000),
    },
  });

  return refreshed.access_token;
}

export async function fetchStravaActivities(
  accessToken: string,
  page = 1,
  perPage = 50
): Promise<StravaActivity[]> {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });

  const res = await fetch(`${STRAVA_API}/athlete/activities?${params}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch activities: ${res.status}`);
  }

  return res.json();
}

export async function fetchStravaAthlete(
  accessToken: string
): Promise<StravaAthlete> {
  const res = await fetch(`${STRAVA_API}/athlete`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch athlete: ${res.status}`);
  }

  return res.json();
}

export async function fetchStravaActivityDetail(
  accessToken: string,
  activityId: string | number
): Promise<StravaActivityDetail> {
  const res = await fetch(`${STRAVA_API}/activities/${activityId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch activity detail: ${res.status}`);
  }

  return res.json();
}

export async function fetchStravaAthleteStats(
  accessToken: string,
  athleteId: string | number
): Promise<StravaAthleteStats> {
  const res = await fetch(`${STRAVA_API}/athletes/${athleteId}/stats`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch athlete stats: ${res.status}`);
  }

  return res.json();
}

export async function fetchStravaActivityStreams(
  accessToken: string,
  activityId: string | number,
  keys: string[] = ["heartrate", "velocity_smooth", "time"]
): Promise<{
  heartrates: number[];
  velocities: number[];
  timeSeconds: number[];
}> {
  const params = new URLSearchParams({
    keys: keys.join(","),
    key_by_type: "true",
  });

  const res = await fetch(
    `${STRAVA_API}/activities/${activityId}/streams?${params}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (res.status === 404) {
    return { heartrates: [], velocities: [], timeSeconds: [] };
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch activity streams: ${res.status}`);
  }

  const json = (await res.json()) as {
    heartrate?: { data: number[] };
    velocity_smooth?: { data: number[] };
    time?: { data: number[] };
  };

  return {
    heartrates: json.heartrate?.data ?? [],
    velocities: json.velocity_smooth?.data ?? [],
    timeSeconds: json.time?.data ?? [],
  };
}

type StravaStreamSeries = {
  data: number[];
};

type StravaStreamsByType = {
  heartrate?: StravaStreamSeries;
  time?: StravaStreamSeries;
};

export async function fetchStravaActivityHeartrateStream(
  accessToken: string,
  activityId: string | number
): Promise<{ heartrates: number[]; timeSeconds: number[] | null }> {
  const params = new URLSearchParams({
    keys: "heartrate,time",
    key_by_type: "true",
  });

  const res = await fetch(
    `${STRAVA_API}/activities/${activityId}/streams?${params}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (res.status === 404) {
    return { heartrates: [], timeSeconds: null };
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch activity streams: ${res.status}`);
  }

  const json = (await res.json()) as StravaStreamsByType;
  return {
    heartrates: json.heartrate?.data ?? [],
    timeSeconds: json.time?.data ?? null,
  };
}

/** Bucket start coords + distance to match recurring routes */
export function buildRouteKey(
  startLat?: number | null,
  startLng?: number | null,
  distanceMeters?: number
): string | null {
  if (startLat == null || startLng == null || !distanceMeters) return null;
  const latBucket = Math.round(startLat * 1000) / 1000;
  const lngBucket = Math.round(startLng * 1000) / 1000;
  const distBucket = Math.round(distanceMeters / 500) * 500;
  return `${latBucket},${lngBucket},${distBucket}`;
}

export function isRunType(type: string): boolean {
  const t = type.toLowerCase();
  return t.includes("run") || t === "walk" || t === "hike";
}

export function formatPace(speedMps: number): string {
  if (!speedMps || speedMps <= 0) return "—";
  const totalSec = Math.round(1609.34 / speedMps);
  if (totalSec < 0) return "—";
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}/mi`;
}

export function formatDistance(meters: number): string {
  const miles = meters / 1609.34;
  return `${miles.toFixed(2)} mi`;
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
}
