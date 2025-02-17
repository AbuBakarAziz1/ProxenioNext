import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";


export async function GET(req) {
  try {
    await connectDB();

    // Get session (optional: if using authentication)
    // const session = await getServerSession(req);
    // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = "67b2139e66a17f0c7869a85b"; // Replace with session user ID
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
