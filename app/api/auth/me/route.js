import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = cookies(); // ✅ Await cookies properly
    const token = cookieStore.get("authToken")?.value;
    if (!token) return Response.json({ error: "Not authenticated" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select("-password");

    if (!user) return Response.json({ error: "User not found" }, { status: 404 });

    return Response.json({ user }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
}
