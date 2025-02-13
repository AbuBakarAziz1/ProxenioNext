import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Remove token by setting it as an expired cookie
  response.headers.set("Set-Cookie", "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly");

  return response;
}
