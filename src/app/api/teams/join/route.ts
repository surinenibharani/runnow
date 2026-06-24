import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getClientIp, rateLimit } from "@/lib/security/rate-limit";
import { sanitizeText } from "@/lib/security/sanitize";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip = getClientIp(request);
  const limit = rateLimit(`team-join:${ip}`, 20, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  const inviteCode = sanitizeText(body.inviteCode, 40);
  const message = sanitizeText(body.message, 200);

  if (!inviteCode) {
    return NextResponse.json({ error: "Invite code is required" }, { status: 400 });
  }

  const team = await prisma.team.findUnique({ where: { inviteCode } });
  if (!team) {
    return NextResponse.json({ error: "Invalid invite code" }, { status: 404 });
  }

  if (team.coachId === session.user.id) {
    return NextResponse.json({ error: "You coach this team already" }, { status: 400 });
  }

  const existing = await prisma.teamMember.findUnique({
    where: { teamId_userId: { teamId: team.id, userId: session.user.id } },
  });

  if (existing) {
    return NextResponse.json(
      { error: `Request already ${existing.status.toLowerCase()}` },
      { status: 409 }
    );
  }

  const membership = await prisma.teamMember.create({
    data: {
      teamId: team.id,
      userId: session.user.id,
      message: message || null,
      status: "PENDING",
    },
  });

  return NextResponse.json({ membership, teamName: team.name }, { status: 201 });
}
