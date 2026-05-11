import { NextRequest, NextResponse } from "next/server";

const AUTH_TOKEN_KEY = "teamup-auth-token";

type JwtPayload = {
  role?: string;
};

const decodeBase64Url = (value: string) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4;

  return padding === 0
    ? normalized
    : normalized.padEnd(normalized.length + (4 - padding), "=");
};

const decodeJwtPayload = (token: string): JwtPayload | null => {
  try {
    const payloadPart = token.split(".")[1];

    if (!payloadPart) {
      return null;
    }

    const decoded = globalThis.atob(decodeBase64Url(payloadPart));

    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
};

const buildSignInRedirect = (request: NextRequest) => {
  const redirectUrl = new URL("/auth", request.url);
  redirectUrl.searchParams.set("mode", "signin");
  redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname + request.nextUrl.search);
  return redirectUrl;
};

const buildDashboardRedirect = (request: NextRequest) => {
  return new URL("/dashboard", request.url);
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN_KEY)?.value;
  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = pathname.startsWith("/admin") || pathname.startsWith("/dashboard");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(buildSignInRedirect(request));
  }

  const payload = token ? decodeJwtPayload(token) : null;

  if (isProtectedRoute && !payload) {
    return NextResponse.redirect(buildSignInRedirect(request));
  }

  if (pathname.startsWith("/admin")) {
    if (payload?.role !== "SYSTEM_ADMIN") {
      return NextResponse.redirect(buildDashboardRedirect(request));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};