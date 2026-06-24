import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ slug: string; memberId: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug, memberId } = await context.params;
  const body = await request.json();
  const status = body.status as string;

  if (status !== "APPROVED" && status !== "REJECTED") {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const team = await prisma.team.findUnique({ where: { slug } });
  if (!team || team.coachId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const membership = await prisma.teamMember.findFirst({
    where: { id: memberId, teamId: team.id },
  });

  if (!membership) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const updated = await prisma.teamMember.update({
    where: { id: memberId },
    data: { status },
  });

  return NextResponse.json({ membership: updated });
}
