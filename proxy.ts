import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const encodedSecret = process.env.JWT_SECRET
  ? new TextEncoder().encode(process.env.JWT_SECRET)
  : null;

async function verifyToken(token: string) {
  if (!encodedSecret) return null;
  try {
    const { payload } = await jwtVerify(token, encodedSecret);
    return payload;
  } catch {
    return null;
  }
}

const protectedRoutes = ["/admin", "/client", "/driver"];
const adminRoutes = ["/admin"];
const driverRoutes = ["/driver"];
const publicOnlyRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) => path.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => path.startsWith(route));
  const isDriverRoute = driverRoutes.some((route) => path.startsWith(route));
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

  // Handle admin routes specifically
  if (isAdminRoute && payload?.role !== "ADMIN") {
    if (payload?.role === "DRIVER") {
      return NextResponse.redirect(new URL("/driver", req.nextUrl));
    }
    return NextResponse.redirect(new URL("/client", req.nextUrl));
  }

  // Handle driver routes specifically
  if (isDriverRoute && payload?.role !== "DRIVER") {
    if (payload?.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }
    return NextResponse.redirect(new URL("/client", req.nextUrl));
  }

  // Utilisateur DÉJÀ connecté qui revient sur /login, /register, etc. :
  // on le déconnecte (on efface le cookie de session) et on affiche le
  // formulaire, pour pouvoir se reconnecter avec un autre compte/rôle.
  if (isPublicOnly && payload) {
    const res = NextResponse.next();
    res.cookies.set("auth_token", "", { path: "/", maxAge: 0 });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
