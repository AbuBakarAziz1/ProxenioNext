import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/utils/auth";

// ✅ Get All Users (Admin Only)
export async function GET(req) {
  await connectDB();
  const user = await verifyToken(req);

  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const users = await User.find().select("-password"); // Exclude password field
  return NextResponse.json(users);
}

// ✅ Update User Role (Admin Only)
export async function PUT(req) {
  await connectDB();
  const user = await verifyToken(req);

  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { userId, newRole } = await req.json();
  const updatedUser = await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });

  return NextResponse.json({ message: "User role updated successfully", updatedUser });
}
