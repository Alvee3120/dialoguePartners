import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/constants";

/**
 * Lightweight guard: bounce unauthenticated /admin requests to the login page.
 * It only inspects the cookie — real authorization always happens in the page
 * or server action via `requireAdmin()`.
 *
 * Next.js 16 renamed the `middleware` file convention to `proxy`.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminArea =
    pathname === "/admin" || pathname.startsWith("/admin/");
  const isLogin = pathname.startsWith("/admin/login");

  if (isAdminArea && !isLogin && !request.cookies.has(SESSION_COOKIE_NAME)) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
