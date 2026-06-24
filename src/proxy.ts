import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const blockedPaths = [
  /\.env/i,
  /\.git/i,
  /wp-admin/i,
  /wp-login/i,
  /phpmyadmin/i,
  /\.php$/i,
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (blockedPaths.some((pattern) => pattern.test(pathname))) {
    return new NextResponse(null, { status: 404 });
  }

  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
