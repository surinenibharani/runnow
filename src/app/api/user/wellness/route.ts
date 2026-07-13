import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  parseDateKey,
  toDateKey,
  toStoredDateKey,
  wellnessDateKeysForLog,
} from "@/lib/recovery-readiness";

type WellnessBody = {
  date?: string;
  sleepMinutes?: number | null;
  restingHeartRate?: number | null;
  /** Convenience: decimal hours e.g. 7.5 */
  sleepHours?: number | null;
};

function parseWellnessBody(body: WellnessBody): {
  date: Date;
  sleepMinutes: number | null | undefined;
  restingHeartRate: number | null | undefined;
} | { error: string } {
  const dateKey = body.date ?? toDateKey(new Date());
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
    return { error: "Invalid date format. Use YYYY-MM-DD." };
  }

  let sleepMinutes = body.sleepMinutes;
  if (body.sleepHours != null) {
    if (body.sleepHours < 0 || body.sleepHours > 24) {
      return { error: "Sleep hours must be between 0 and 24." };
    }
    sleepMinutes = Math.round(body.sleepHours * 60);
  }

  if (
    sleepMinutes != null &&
    (sleepMinutes < 0 || sleepMinutes > 24 * 60)
  ) {
    return { error: "Sleep must be between 0 and 24 hours." };
  }

  if (
    body.restingHeartRate != null &&
    (body.restingHeartRate < 30 || body.restingHeartRate > 120)
  ) {
    return { error: "Resting heart rate must be between 30 and 120 bpm." };
  }

  return {
    date: parseDateKey(dateKey),
    sleepMinutes,
    restingHeartRate: body.restingHeartRate,
  };
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await prisma.dailyWellness.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
    take: 30,
  });

  return NextResponse.json({
    entries: rows.map((row) => ({
      date: toStoredDateKey(row.date),
      sleepMinutes: row.sleepMinutes,
      restingHeartRate: row.restingHeartRate,
      source: row.source,
    })),
  });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: WellnessBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const hasSleep = body.sleepHours != null || body.sleepMinutes != null;
  const hasRhr = body.restingHeartRate != null;

  if (!hasSleep && !hasRhr) {
    return NextResponse.json(
      { error: "Provide sleepHours, sleepMinutes, or restingHeartRate." },
      { status: 400 }
    );
  }

  const { sleepDate, rhrDate } = wellnessDateKeysForLog();
  const entries: Array<{
    date: Date;
    sleepMinutes?: number | null;
    restingHeartRate?: number | null;
  }> = [];

  if (hasSleep) {
    const sleepParsed = parseWellnessBody({
      ...body,
      date: body.date ?? sleepDate,
      restingHeartRate: undefined,
    });
    if ("error" in sleepParsed) {
      return NextResponse.json({ error: sleepParsed.error }, { status: 400 });
    }
    entries.push({
      date: sleepParsed.date,
      sleepMinutes: sleepParsed.sleepMinutes ?? null,
    });
  }

  if (hasRhr) {
    const rhrParsed = parseWellnessBody({
      date: rhrDate,
      restingHeartRate: body.restingHeartRate,
    });
    if ("error" in rhrParsed) {
      return NextResponse.json({ error: rhrParsed.error }, { status: 400 });
    }
    entries.push({
      date: rhrParsed.date,
      restingHeartRate: rhrParsed.restingHeartRate ?? null,
    });
  }

  const saved = [];
  for (const entry of entries) {
    const row = await prisma.dailyWellness.upsert({
      where: {
        userId_date: { userId: session.user.id, date: entry.date },
      },
      create: {
        userId: session.user.id,
        date: entry.date,
        sleepMinutes: entry.sleepMinutes ?? null,
        restingHeartRate: entry.restingHeartRate ?? null,
        source: "manual",
      },
      update: {
        ...(entry.sleepMinutes !== undefined
          ? { sleepMinutes: entry.sleepMinutes }
          : {}),
        ...(entry.restingHeartRate !== undefined
          ? { restingHeartRate: entry.restingHeartRate }
          : {}),
        source: "manual",
      },
    });
    saved.push({
      date: toStoredDateKey(row.date),
      sleepMinutes: row.sleepMinutes,
      restingHeartRate: row.restingHeartRate,
      source: row.source,
    });
  }

  return NextResponse.json({
    entries: saved,
    message: "Wellness data saved.",
  });
}
