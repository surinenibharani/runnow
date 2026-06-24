import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe | null {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return null;

  if (!stripeClient) {
    stripeClient = new Stripe(secret, {
      apiVersion: "2026-05-27.dahlia",
      typescript: true,
    });
  }

  return stripeClient;
}

export function getCoachPriceId(): string | null {
  return process.env.STRIPE_COACH_PRICE_ID ?? null;
}

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.AUTH_URL ??
    "http://localhost:3000"
  );
}

export const COACH_SUBSCRIPTION_STATUSES = new Set(["active", "trialing"]);
