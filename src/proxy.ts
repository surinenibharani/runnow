import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { getClientIp, rateLimit } from "@/lib/security/rate-limit";

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

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (blockedPaths.some((pattern) => pattern.test(pathname))) {
    return new NextResponse(null, { status: 404 });
  }

  if (request.method === "POST" && pathname.startsWith("/api/auth/")) {
    const ip = getClientIp(request);
    const limited = rateLimit(`auth:${ip}`, 15, 15 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many login attempts. Try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(limited.retryAfter) },
        }
      );
    }
  }

  if (isProtectedRoute(pathname)) {
    const session = await auth();
    if (!session?.user) {
      const login = new URL("/login", request.url);
      login.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(login);
    }
  }

  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
