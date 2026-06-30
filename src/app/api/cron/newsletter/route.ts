import { NextResponse } from "next/server";
import { runNewsletterCron } from "@/lib/newsletter/send";
import { timingSafeStringEqual } from "@/lib/security/timing-safe";

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;

  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return false;

  return timingSafeStringEqual(auth.slice("Bearer ".length), secret);
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runNewsletterCron();
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  return GET(request);
}
