import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb"; // Your MongoDB connection utility
import User from "@/models/User"; // Your User model

export async function POST(req) {
  try {
    await connectDB(); // Ensure DB connection
    const { userId, oldPassword, newPassword, confirmPassword } = await req.json();

    // Validate input
    if (!userId || !oldPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: "New passwords do not match." }, { status: 400 });
    }

    // Find user in DB
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Incorrect old password." }, { status: 401 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: "Password updated successfully!" }, { status: 200 });

  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json({ error: "Server error, try again later." }, { status: 500 });
  }
}
