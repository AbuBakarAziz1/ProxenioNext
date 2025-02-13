import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";

export async function GET(req) {
  await connectDB();
  const token = req.cookies.get("token")?.value;

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const user = await User.findById(payload.id).select("-password");
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export async function PUT(req) {
  await connectDB();
  const token = req.cookies.get("token")?.value;

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const user = await User.findById(payload.id);

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { name, email, oldPassword, newPassword } = await req.json();

    // Update Name & Email
    if (name && email) {
      user.name = name;
      user.email = email;
    }

    // Update Password
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) return NextResponse.json({ error: "Old password is incorrect" }, { status: 400 });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();
    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
