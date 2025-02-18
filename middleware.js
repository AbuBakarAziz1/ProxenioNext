import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("authToken")?.value; // Get JWT token from cookies
  const url = req.nextUrl.pathname;

  if (!token) {
    //console.log("No Token Found - Redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify the token using 'jose'
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    //console.log("Decoded User:", payload);

    const userRole = payload.role; // Extract role from token
    
    // Prevent non-admins from accessing /dashboard/admin
    if (url.startsWith("/admin") && userRole !== "admin") {
      console.log("Unauthorized! Non-admin trying to access /dashboard/admin");
      return NextResponse.redirect(new URL(`/${userRole}`, req.url));
    }

    // Prevent non-moderators from accessing /dashboard/moderator
    if (url.startsWith("/moderator") && userRole !== "moderator") {
      console.log("Unauthorized! Non-moderator trying to access /dashboard/moderator");
      return NextResponse.redirect(new URL(`/${userRole}`, req.url));
    }

    // Prevent admins & moderators from accessing /dashboard/user
    if (url.startsWith("/user") && userRole !== "user") {
      console.log("Unauthorized! Admin/Moderator trying to access /dashboard/user");
      return NextResponse.redirect(new URL(`/${userRole}`, req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("JWT Verification Failed:", error.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

//Fixed matcher (no capturing groups)
export const config = {
  matcher: [
    "/admin/:path*",
    "/moderator/:path*",
    "/user/:path*",
  ],
};