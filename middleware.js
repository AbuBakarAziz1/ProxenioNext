import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value; // Get JWT token from cookies
  const url = req.nextUrl.pathname;

  if (!token) {
    console.log("No Token Found - Redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify the token using 'jose'
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    //console.log("Decoded User:", payload);

    const userRole = payload.role; // Extract role from token

    // 🚨 Restrict unauthorized access 🚨
    
    // Prevent non-admins from accessing /dashboard/admin
    if (url.startsWith("/dashboard/admin") && userRole !== "admin") {
      console.log("Unauthorized! Non-admin trying to access /dashboard/admin");
      return NextResponse.redirect(new URL(`/dashboard/${userRole}`, req.url));
    }

    // Prevent non-moderators from accessing /dashboard/moderator
    if (url.startsWith("/dashboard/moderator") && userRole !== "moderator") {
      console.log("Unauthorized! Non-moderator trying to access /dashboard/moderator");
      return NextResponse.redirect(new URL(`/dashboard/${userRole}`, req.url));
    }

    // Prevent admins & moderators from accessing /dashboard/user
    if (url.startsWith("/dashboard/user") && userRole !== "user") {
      console.log("Unauthorized! Admin/Moderator trying to access /dashboard/user");
      return NextResponse.redirect(new URL(`/dashboard/${userRole}`, req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("JWT Verification Failed:", error.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect all dashboard routes
};
