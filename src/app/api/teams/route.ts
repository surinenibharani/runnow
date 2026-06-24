import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isCoach, uniqueTeamSlug } from "@/lib/teams";
import { sanitizeText } from "@/lib/security/sanitize";
import { getClientIp, rateLimit } from "@/lib/security/rate-limit";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const [coachedTeams, memberships] = await Promise.all([
    prisma.team.findMany({
      where: { coachId: userId },
      include: {
        _count: { select: { members: true } },
        members: {
          where: { status: "PENDING" },
          include: { user: { select: { id: true, name: true, email: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.teamMember.findMany({
      where: { userId },
      include: {
        team: {
          include: {
            coach: { select: { id: true, name: true } },
            members: { where: { status: "APPROVED" }, select: { id: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return NextResponse.json({ coachedTeams, memberships });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip = getClientIp(request);
  const limit = rateLimit(`team-create:${ip}`, 10, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user || !isCoach(user)) {
    return NextResponse.json(
      { error: "Coach subscription required to create teams" },
      { status: 403 }
    );
  }

  const body = await request.json();
  const name = sanitizeText(body.name, 80);
  const description = sanitizeText(body.description, 300);

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Team name is required" }, { status: 400 });
  }

  const slug = await uniqueTeamSlug(name);

  const team = await prisma.team.create({
    data: {
      name,
      slug,
      description: description || null,
      coachId: user.id,
    },
  });

  return NextResponse.json({ team }, { status: 201 });
}
