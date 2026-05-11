import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ACCESS_TOKEN_COOKIE = "accessToken";
const FRONTEND_TOKEN_COOKIE = "teamup-auth-token";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;

  if (!accessToken) {
    return NextResponse.json(
      { success: false, message: "OAuth session not found." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({
    success: true,
    token: accessToken,
  });

  response.cookies.set(FRONTEND_TOKEN_COOKIE, accessToken, {
    path: "/",
    sameSite: "lax",
  });

  return response;
}
