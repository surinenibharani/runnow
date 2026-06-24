import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sanitizeText } from "@/lib/security/sanitize";
import { parseAge } from "@/lib/security/validation";

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, age } = body;

  const data: { name?: string | null; age?: number | null } = {};

  if (name !== undefined) {
    const cleanName = sanitizeText(name, 80);
    data.name = cleanName || null;
  }

  if (age !== undefined) {
    if (age === null || age === "") {
      data.age = null;
    } else {
      const parsed = parseAge(age);
      if (parsed === null) {
        return NextResponse.json({ error: "Invalid age" }, { status: 400 });
      }
      data.age = parsed;
    }
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data,
    select: { id: true, name: true, email: true, age: true },
  });

  return NextResponse.json(user);
}
