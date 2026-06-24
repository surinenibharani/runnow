import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { disconnectStrava } from "@/lib/strava-sync";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const account = await prisma.stravaAccount.findUnique({
    where: { userId: session.user.id },
  });

  if (!account) {
    return NextResponse.json({ error: "Strava not connected" }, { status: 400 });
  }

  await disconnectStrava(session.user.id);

  return NextResponse.json({ message: "Strava disconnected" });
}
