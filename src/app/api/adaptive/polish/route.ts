import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  isAdaptiveAiConfigured,
  polishAdaptiveBrief,
} from "@/lib/adaptive-ai";
import type { AdaptiveBrief } from "@/lib/adaptive-brief";
import { getClientIp, rateLimitAsync } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isAdaptiveAiConfigured()) {
    return NextResponse.json({
      polished: false,
      provider: "none",
      message:
        "AI polish is not configured. Rule-based coaching still applies.",
    });
  }

  const ip = getClientIp(request);
  const limited = await rateLimitAsync(
    `adaptive-polish:${session.user.id}:${ip}`,
    20,
    60 * 60 * 1000
  );
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests", retryAfter: limited.retryAfter },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfter) },
      }
    );
  }

  let brief: AdaptiveBrief;
  try {
    const body = (await request.json()) as { brief?: AdaptiveBrief };
    if (!body.brief?.headline || !body.brief?.body || !body.brief?.action) {
      return NextResponse.json({ error: "Invalid brief" }, { status: 400 });
    }
    brief = body.brief;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = await polishAdaptiveBrief(brief);
  return NextResponse.json(result);
}
