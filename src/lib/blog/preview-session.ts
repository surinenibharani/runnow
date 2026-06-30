import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { derivePreviewSigningKey } from "@/lib/security/token-crypto";
import { timingSafeStringEqual } from "@/lib/security/timing-safe";

export const BLOG_PREVIEW_COOKIE = "blog_preview_session";
const PREVIEW_TTL_MS = 24 * 60 * 60 * 1000;

function getPreviewSecret(): string | null {
  const secret = process.env.BLOG_PREVIEW_SECRET?.trim();
  return secret || null;
}

function signPreviewPayload(payload: string, secret: string): string {
  return createHmac("sha256", derivePreviewSigningKey(secret))
    .update(payload)
    .digest("base64url");
}

export function createPreviewSessionValue(secret: string): string {
  const expiresAt = Date.now() + PREVIEW_TTL_MS;
  const payload = `v1.${expiresAt}`;
  return `${payload}.${signPreviewPayload(payload, secret)}`;
}

export function isValidPreviewSessionValue(
  token: string,
  secret: string
): boolean {
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") return false;

  const payload = `${parts[0]}.${parts[1]}`;
  const signature = parts[2];
  const expected = signPreviewPayload(payload, secret);

  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!timingSafeEqual(sigBuf, expectedBuf)) return false;

  const expiresAt = Number(parts[1]);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export async function hasBlogPreviewAccess(): Promise<boolean> {
  if (process.env.NODE_ENV === "development") return true;

  const secret = getPreviewSecret();
  if (!secret) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(BLOG_PREVIEW_COOKIE)?.value;
  if (!token) return false;

  return isValidPreviewSessionValue(token, secret);
}

export function isValidPreviewSecret(candidate: string | null | undefined): boolean {
  const secret = getPreviewSecret();
  if (!secret || !candidate) return false;
  return timingSafeStringEqual(candidate, secret);
}

export function previewSessionCookieOptions(maxAgeSec: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: maxAgeSec,
  };
}
