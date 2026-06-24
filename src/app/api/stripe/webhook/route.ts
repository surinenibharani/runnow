import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

async function activateCoach(
  userId: string,
  customerId: string | null,
  subscriptionId: string,
  status: string
) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      role: "COACH",
      subscriptionTier: "COACH",
      stripeCustomerId: customerId ?? undefined,
      stripeSubscriptionId: subscriptionId,
      stripeSubscriptionStatus: status,
    },
  });
}

async function deactivateCoach(userId: string, status: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      role: "RUNNER",
      subscriptionTier: "FREE",
      stripeSubscriptionStatus: status,
    },
  });
}

async function handleSubscription(
  subscription: Stripe.Subscription,
  statusOverride?: string
) {
  const userId = subscription.metadata.userId;
  if (!userId) return;

  const status = statusOverride ?? subscription.status;
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  if (status === "active" || status === "trialing") {
    await activateCoach(userId, customerId, subscription.id, status);
    return;
  }

  if (
    status === "canceled" ||
    status === "unpaid" ||
    status === "incomplete_expired"
  ) {
    await deactivateCoach(userId, status);
  }
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook not configured" }, { status: 503 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== "subscription" || !session.subscription) break;

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        const userId = session.metadata?.userId ?? subscription.metadata.userId;
        if (!userId) break;

        const customerId =
          typeof session.customer === "string"
            ? session.customer
            : session.customer?.id ?? null;

        await activateCoach(
          userId,
          customerId,
          subscription.id,
          subscription.status
        );
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscription(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscription(subscription, "canceled");
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("Stripe webhook handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
