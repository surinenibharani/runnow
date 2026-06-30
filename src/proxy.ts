import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { safeCallbackUrl } from "@/lib/security/callback-url";
import {
  createContentSecurityPolicy,
  generateCspNonce,
} from "@/lib/security/csp";
import { getClientIp, rateLimitAsync } from "@/lib/security/rate-limit";

const blockedPaths = [
  /\.env/i,
  /\.git/i,
  /wp-admin/i,
  /wp-login/i,
  /phpmyadmin/i,
  /\.php$/i,
];

const protectedPaths = ["/dashboard"];

function isProtectedRoute(pathname: string): boolean {
  if (protectedPaths.includes(pathname)) return true;
  if (pathname.startsWith("/teams/") && pathname.length > "/teams/".length) {
    return true;
  }
  return false;
}

function withCsp(response: NextResponse, nonce: string): NextResponse {
  response.headers.set("Content-Security-Policy", createContentSecurityPolicy(nonce));
  return response;
}

function nextWithNonce(request: NextRequest, nonce: string): NextResponse {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  return withCsp(
    NextResponse.next({ request: { headers: requestHeaders } }),
    nonce
  );
}

export const proxy = auth(async (request) => {
  const { pathname } = request.nextUrl;
  const nonce = generateCspNonce();

  if (blockedPaths.some((pattern) => pattern.test(pathname))) {
    return withCsp(new NextResponse(null, { status: 404 }), nonce);
  }

  if (
    request.method === "POST" &&
    pathname === "/api/auth/callback/credentials"
  ) {
    const ip = getClientIp(request);
    const limited = await rateLimitAsync(`auth:${ip}`, 15, 15 * 60 * 1000);
    if (!limited.ok) {
      return withCsp(
        NextResponse.json(
          { error: "Too many login attempts. Try again later." },
          {
            status: 429,
            headers: { "Retry-After": String(limited.retryAfter) },
          }
        ),
        nonce
      );
    }
  }

  if (request.auth?.user && (pathname === "/login" || pathname === "/signup")) {
    const callbackUrl = safeCallbackUrl(
      request.nextUrl.searchParams.get("callbackUrl"),
      "/dashboard"
    );
    return withCsp(
      NextResponse.redirect(new URL(callbackUrl, request.url)),
      nonce
    );
  }

  if (isProtectedRoute(pathname) && !request.auth?.user) {
    const login = new URL("/login", request.url);
    login.searchParams.set("callbackUrl", pathname);
    return withCsp(NextResponse.redirect(login), nonce);
  }

  if (pathname.startsWith("/api/")) {
    const response = nextWithNonce(request, nonce);
    const isPublicCommentsGet =
      request.method === "GET" &&
      /^\/api\/blog\/[^/]+\/comments$/.test(pathname);

    response.headers.set(
      "Cache-Control",
      isPublicCommentsGet
        ? "public, s-maxage=60, stale-while-revalidate=300"
        : "no-store"
    );
    return response;
  }

  return nextWithNonce(request, nonce);
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
