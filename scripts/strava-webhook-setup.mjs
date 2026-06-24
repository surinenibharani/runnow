#!/usr/bin/env node
/**
 * Register Strava webhook subscription for real-time activity sync.
 * Usage:
 *   STRAVA_CLIENT_ID=... STRAVA_CLIENT_SECRET=... STRAVA_WEBHOOK_VERIFY_TOKEN=your-token \
 *   node scripts/strava-webhook-setup.mjs --site-url https://yourdomain.com
 */
import { readFileSync, existsSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { randomBytes } from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env");

function loadEnv() {
  const env = { ...process.env };
  if (!existsSync(envPath)) return env;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
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

function upsertEnv(key, value) {
  let content = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
  const line = `${key}="${value}"`;
  const pattern = new RegExp(`^${key}=.*$`, "m");
  if (pattern.test(content)) {
    content = content.replace(pattern, line);
  } else {
    content = content.trimEnd() + `\n${line}\n`;
  }
  writeFileSync(envPath, content);
}

async function main() {
  const env = loadEnv();
  const clientId = env.STRAVA_CLIENT_ID;
  const clientSecret = env.STRAVA_CLIENT_SECRET;
  let verifyToken = env.STRAVA_WEBHOOK_VERIFY_TOKEN;
  const siteUrl = process.argv.includes("--site-url")
    ? process.argv[process.argv.indexOf("--site-url") + 1]
    : env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!clientId || !clientSecret) {
    console.error("❌  STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET required");
    process.exit(1);
  }

  if (!verifyToken) {
    verifyToken = randomBytes(16).toString("hex");
    upsertEnv("STRAVA_WEBHOOK_VERIFY_TOKEN", verifyToken);
    console.log(`✓  Generated STRAVA_WEBHOOK_VERIFY_TOKEN → saved to .env`);
  }

  const callbackUrl = `${siteUrl.replace(/\/$/, "")}/api/strava/webhook`;

  const listRes = await fetch(
    `https://www.strava.com/api/v3/push_subscriptions?client_id=${clientId}&client_secret=${clientSecret}`
  );
  const existing = listRes.ok ? await listRes.json() : [];

  if (Array.isArray(existing) && existing.some((s) => s.callback_url === callbackUrl)) {
    console.log(`✓  Webhook already registered: ${callbackUrl}`);
    return;
  }

  const res = await fetch("https://www.strava.com/api/v3/push_subscriptions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      callback_url: callbackUrl,
      verify_token: verifyToken,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌  Failed to create subscription:", text);
    process.exit(1);
  }

  const sub = await res.json();
  console.log(`✓  Strava webhook registered (id: ${sub.id})`);
  console.log(`   URL: ${callbackUrl}`);
  console.log(`   Verify token: ${verifyToken}`);
  console.log("\n   Add STRAVA_WEBHOOK_VERIFY_TOKEN to Vercel env vars.\n");
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
