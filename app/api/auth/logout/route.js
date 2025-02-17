
import { cookies } from "next/headers";
export async function POST() {
  try {
    const cookieStore = await cookies();

    // ✅ Remove the auth token by setting it to an empty value & expiring it
    cookieStore.set("authToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0), // ✅ Expire the cookie immediately
    });

    return Response.json({ message: "Logged out successfully" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Error logging out" }, { status: 500 });
  }
}
