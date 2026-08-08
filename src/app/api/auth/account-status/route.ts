import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getClientIp, rateLimitAsync } from "@/lib/security/rate-limit";
import { sanitizeText } from "@/lib/security/sanitize";
import { isValidEmail } from "@/lib/security/validation";

/**
 * Reports whether an account exists for an email so the login page can show a
 * helpful message ("wrong password" vs "no account — please register").
 * Rate limited to blunt email-enumeration abuse.
 */
export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = await rateLimitAsync(
      `account-status:${ip}`,
      15,
      15 * 60 * 1000
    );
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
      );
    }

    const body = await request.json().catch(() => ({}));
    const cleanEmail = sanitizeText(body?.email ?? "", 254).toLowerCase();

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      return NextResponse.json({ registered: false, hasPassword: false });
    }

    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
      select: { passwordHash: true },
    });

    return NextResponse.json({
      registered: Boolean(user),
      hasPassword: Boolean(user?.passwordHash),
    });
  } catch {
    return NextResponse.json({ registered: false, hasPassword: false });
  }
}
