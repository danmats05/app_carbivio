import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./services/auth";

const protectedRoutes = ["/dashboard", "/admin"];
const adminRoutes = ["/admin"];
const publicOnlyRoutes = ["/login", "/register"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) => path.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => path.startsWith(route));
  const isPublicOnly = publicOnlyRoutes.some((route) => path.startsWith(route));

  // Get token from cookies
  const token = req.cookies.get("auth_token")?.value;

  // Let public general routes pass
  if (!isProtected && !isAdminRoute && !isPublicOnly) {
    return NextResponse.next();
  }

  let payload: any = null;
  if (token) {
    payload = await verifyToken(token);
  }

  // Handle protected routes (user dashboard & admin)
  if (isProtected && !payload) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Handle admin routes specifically (prevent users from accessing admin routes)
  if (isAdminRoute && payload?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // Handle public-only routes (login, register) for ALREADY logged in users
  if (isPublicOnly && payload) {
    if (payload.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
