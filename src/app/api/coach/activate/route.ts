import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

/** Dev-only fallback when Stripe is not configured */
export async function POST() {
  if (getStripe()) {
    return NextResponse.json(
      { error: "Use Stripe checkout instead of manual activation" },
      { status: 400 }
    );
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      role: "COACH",
      subscriptionTier: "COACH",
    },
  });

  return NextResponse.json({
    message: "Coach plan activated (dev mode). You can now create teams.",
    role: user.role,
    subscriptionTier: user.subscriptionTier,
  });
}
