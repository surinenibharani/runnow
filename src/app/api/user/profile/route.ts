import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, age } = body;

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(name !== undefined && { name }),
      ...(age !== undefined && { age: age ? parseInt(String(age), 10) : null }),
    },
  });

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    age: user.age,
  });
}
