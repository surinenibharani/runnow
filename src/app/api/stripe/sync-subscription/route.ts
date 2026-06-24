import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

/** Sync coach status from Stripe after checkout (webhook may lag a few seconds). */
export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user?.stripeCustomerId) {
    return NextResponse.json({ synced: false, reason: "no_customer" });
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: user.stripeCustomerId,
    status: "all",
    limit: 5,
  });

  const active = subscriptions.data.find((s) =>
    ["active", "trialing"].includes(s.status)
  );

  if (active) {
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        role: "COACH",
        subscriptionTier: "COACH",
        stripeSubscriptionId: active.id,
        stripeSubscriptionStatus: active.status,
      },
    });

    return NextResponse.json({
      synced: true,
      role: updated.role,
      subscriptionTier: updated.subscriptionTier,
      stripeSubscriptionStatus: updated.stripeSubscriptionStatus,
    });
  }

  return NextResponse.json({ synced: false, reason: "no_active_subscription" });
}
