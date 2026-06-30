import { randomUUID } from "node:crypto";

const isDev = process.env.NODE_ENV === "development";

export function createContentSecurityPolicy(nonce: string): string {
  const scriptSrc = isDev
    ? `'self' 'nonce-${nonce}' 'unsafe-eval' https://challenges.cloudflare.com https://www.googletagmanager.com`
    : `'self' 'nonce-${nonce}' 'strict-dynamic' https://challenges.cloudflare.com https://www.googletagmanager.com`;

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
    "img-src 'self' data: blob: https: https://www.google-analytics.com https://www.googletagmanager.com",
    "font-src 'self' data:",
    isDev
      ? "connect-src 'self' ws: wss: https://challenges.cloudflare.com https://*.cloudflare.com https://www.strava.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com"
      : "connect-src 'self' https://challenges.cloudflare.com https://*.cloudflare.com https://www.strava.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
    "frame-src 'self' https://challenges.cloudflare.com",
    "child-src 'self' https://challenges.cloudflare.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");
}

export function generateCspNonce(): string {
  return Buffer.from(randomUUID()).toString("base64");
}
