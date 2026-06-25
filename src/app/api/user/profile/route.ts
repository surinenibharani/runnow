import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sanitizeText } from "@/lib/security/sanitize";
import { parseAge, parseGender, parseHeightCm, parseWeightKg } from "@/lib/security/validation";

const profileSelect = {
  id: true,
  name: true,
  email: true,
  age: true,
  gender: true,
  weightKg: true,
  heightCm: true,
} as const;

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: profileSelect,
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, age, gender, weightKg, heightCm } = body;

  const data: {
    name?: string | null;
    age?: number | null;
    gender?: string | null;
    weightKg?: number | null;
    heightCm?: number | null;
  } = {};

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

  if (gender !== undefined) {
    if (gender === null || gender === "") {
      data.gender = null;
    } else {
      const parsed = parseGender(gender);
      if (parsed === null) {
        return NextResponse.json({ error: "Invalid gender" }, { status: 400 });
      }
      data.gender = parsed;
    }
  }

  if (weightKg !== undefined) {
    if (weightKg === null || weightKg === "") {
      data.weightKg = null;
    } else {
      const parsed = parseWeightKg(weightKg);
      if (parsed === null) {
        return NextResponse.json({ error: "Invalid weight" }, { status: 400 });
      }
      data.weightKg = parsed;
    }
  }

  if (heightCm !== undefined) {
    if (heightCm === null || heightCm === "") {
      data.heightCm = null;
    } else {
      const parsed = parseHeightCm(heightCm);
      if (parsed === null) {
        return NextResponse.json({ error: "Invalid height" }, { status: 400 });
      }
      data.heightCm = parsed;
    }
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data,
    select: profileSelect,
  });

  return NextResponse.json(user);
}
