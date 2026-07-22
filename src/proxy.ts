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

/** Training / bulk scrapers we refuse at the edge (robots.txt also disallows these). */
const blockedBotUserAgents =
  /GPTBot|ChatGPT-User|Google-Extended|CCBot|anthropic-ai|ClaudeBot|Claude-Web|Bytespider|FacebookBot|meta-externalagent|cohere-ai|Diffbot|Omgilibot|PerplexityBot|DataForSeoBot|SeekportBot/i;

/** Legitimate search / preview crawlers — skip aggressive page rate limits. */
const searchEngineUserAgents =
  /Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|Applebot|facebookexternalhit|Twitterbot|LinkedInBot|SkypeUriPreview|WhatsApp|Slackbot/i;

function isProtectedRoute(pathname: string): boolean {
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    return true;
  }
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
  const userAgent = request.headers.get("user-agent") ?? "";

  if (blockedPaths.some((pattern) => pattern.test(pathname))) {
    return withCsp(new NextResponse(null, { status: 404 }), nonce);
  }

  if (blockedBotUserAgents.test(userAgent)) {
    return withCsp(
      new NextResponse("Crawler not permitted. See /robots.txt and /llms.txt.", {
        status: 403,
      }),
      nonce
    );
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

  // Soft anti-scrape: cap HTML page churn per IP (search engines exempt).
  if (
    request.method === "GET" &&
    !pathname.startsWith("/api/") &&
    !searchEngineUserAgents.test(userAgent)
  ) {
    const ip = getClientIp(request);
    const limited = await rateLimitAsync(`page:${ip}`, 180, 60 * 1000);
    if (!limited.ok) {
      return withCsp(
        new NextResponse("Too many requests. Please slow down.", {
          status: 429,
          headers: { "Retry-After": String(limited.retryAfter) },
        }),
        nonce
      );
    }
  }

  if (pathname.startsWith("/api/")) {
    const response = nextWithNonce(request, nonce);
    // Comments list is personalized (own-comment flags) when signed in.
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  return nextWithNonce(request, nonce);
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
