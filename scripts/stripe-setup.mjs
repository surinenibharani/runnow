#!/usr/bin/env node
/**
 * Creates the LetsRunNow Coach Plan product + price in Stripe.
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_... node scripts/stripe-setup.mjs
 *   STRIPE_SECRET_KEY=sk_test_... node scripts/stripe-setup.mjs --site-url https://yourdomain.com
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const envPath = resolve(root, ".env");

const PRODUCT_NAME = "LetsRunNow Coach Plan";
const PRODUCT_LOOKUP = "letsrunnow_coach_plan";
const DEFAULT_PRICE_USD = 999; // $9.99/month

function loadEnvFile() {
  if (!existsSync(envPath)) return {};
  const lines = readFileSync(envPath, "utf8").split("\n");
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    let val = trimmed.slice(eq + 1);
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

function upsertEnv(updates) {
  let content = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
  for (const [key, value] of Object.entries(updates)) {
    const line = `${key}="${value}"`;
    const pattern = new RegExp(`^${key}=.*$`, "m");
    if (pattern.test(content)) {
      content = content.replace(pattern, line);
    } else {
      const stripeSection = content.includes("# Stripe")
        ? content
        : `${content.trimEnd()}\n\n# Stripe\n`;
      if (stripeSection === content && !content.endsWith("\n")) content += "\n";
      if (pattern.test(content)) {
        content = content.replace(pattern, line);
      } else {
        content = content.trimEnd() + `\n${line}\n`;
      }
    }
  }
  writeFileSync(envPath, content);
}

function parseArgs() {
  const args = process.argv.slice(2);
  let siteUrl = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--site-url" && args[i + 1]) siteUrl = args[++i];
  }
  return { siteUrl };
}

async function main() {
  const fileEnv = loadEnvFile();
  const secret = process.env.STRIPE_SECRET_KEY || fileEnv.STRIPE_SECRET_KEY;
  const { siteUrl } = parseArgs();

  if (!secret) {
    console.error("\n❌  STRIPE_SECRET_KEY is required.");
    console.error("    Get it from https://dashboard.stripe.com/test/apikeys");
    console.error("\n    Run:");
    console.error('    STRIPE_SECRET_KEY=sk_test_... npm run stripe:setup\n');
    process.exit(1);
  }

  const stripe = new Stripe(secret, { apiVersion: "2026-05-27.dahlia" });

  console.log("\n🔍  Looking for existing coach product...");

  const existingProducts = await stripe.products.search({
    query: `metadata['lookup_key']:'${PRODUCT_LOOKUP}'`,
    limit: 1,
  });

  let product =
    existingProducts.data[0] ??
    (await stripe.products.create({
      name: PRODUCT_NAME,
      description:
        "Create teams, approve athletes, and view group Strava stats and training progress.",
      metadata: { lookup_key: PRODUCT_LOOKUP },
    }));

  if (existingProducts.data[0]) {
    console.log(`✓  Found product: ${product.id}`);
  } else {
    console.log(`✓  Created product: ${product.id}`);
  }

  const prices = await stripe.prices.list({
    product: product.id,
    active: true,
    type: "recurring",
    limit: 10,
  });

  let price = prices.data.find((p) => p.recurring?.interval === "month");

  if (!price) {
    price = await stripe.prices.create({
      product: product.id,
      unit_amount: DEFAULT_PRICE_USD,
      currency: "usd",
      recurring: { interval: "month" },
      metadata: { lookup_key: PRODUCT_LOOKUP },
    });
    console.log(`✓  Created price: ${price.id} ($9.99/month)`);
  } else {
    console.log(`✓  Using existing price: ${price.id}`);
  }

  const envUpdates = {
    STRIPE_SECRET_KEY: secret,
    STRIPE_COACH_PRICE_ID: price.id,
  };

  upsertEnv(envUpdates);
  console.log("\n✓  Updated .env with STRIPE_SECRET_KEY and STRIPE_COACH_PRICE_ID");

  console.log("\n── Local webhook (run in a second terminal) ──");
  console.log("   brew install stripe/stripe-cli/stripe   # if needed");
  console.log("   stripe login");
  console.log("   stripe listen --forward-to localhost:3000/api/stripe/webhook");
  console.log("   # Copy the whsec_... secret into .env as STRIPE_WEBHOOK_SECRET\n");

  if (siteUrl) {
    const webhookUrl = `${siteUrl.replace(/\/$/, "")}/api/stripe/webhook`;
    console.log("── Production webhook ──");
    console.log(`   URL: ${webhookUrl}`);
    console.log("   Events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted");

    const endpoints = await stripe.webhookEndpoints.list({ limit: 100 });
    const existing = endpoints.data.find((e) => e.url === webhookUrl);

    if (existing) {
      console.log(`\n✓  Webhook endpoint already exists: ${existing.id}`);
      console.log("   Add STRIPE_WEBHOOK_SECRET from Stripe Dashboard → Webhooks → Signing secret");
    } else {
      const endpoint = await stripe.webhookEndpoints.create({
        url: webhookUrl,
        enabled_events: [
          "checkout.session.completed",
          "customer.subscription.updated",
          "customer.subscription.deleted",
        ],
        description: "LetsRunNow coach subscriptions",
      });
      console.log(`\n✓  Created webhook endpoint: ${endpoint.id}`);
      console.log(`   ⚠️  Signing secret is only shown once in the Dashboard.`);
      console.log(`   Go to https://dashboard.stripe.com/test/webhooks/${endpoint.id}`);
      console.log("   → Reveal signing secret → add to .env and Vercel as STRIPE_WEBHOOK_SECRET");
    }
  }

  console.log("\n── Enable Customer Portal ──");
  console.log("   https://dashboard.stripe.com/test/settings/billing/portal → Activate\n");

  console.log("── Test checkout ──");
  console.log("   npm run dev");
  console.log("   Log in → /teams → Subscribe as coach");
  console.log("   Card: 4242 4242 4242 4242 · any future date · any CVC\n");

  console.log("── Vercel env vars to add ──");
  console.log(`   STRIPE_SECRET_KEY=${secret.slice(0, 12)}...`);
  console.log(`   STRIPE_COACH_PRICE_ID=${price.id}`);
  console.log("   STRIPE_WEBHOOK_SECRET=whsec_... (from Dashboard)\n");
}

main().catch((err) => {
  console.error("\n❌  Setup failed:", err.message);
  process.exit(1);
});
