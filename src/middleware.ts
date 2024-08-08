import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import checkIsRateLimited from "@/server/utils/rate-limit";
import type { NextRequest } from "next/server";

/**
 * A middleware function for handling authentication and rate limiting for API.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} The response object.
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname === "/home") {
    const session = await getToken({ req: request });

    if (!session) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  } else {
    const shouldBlockRequest = await checkIsRateLimited(request);

    if (shouldBlockRequest) {
      return new NextResponse("rate limited", { status: 429 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/admin", "/api/generate", "/api/chat", "/api/document"],
};
