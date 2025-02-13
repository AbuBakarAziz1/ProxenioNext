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
  } catch {
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

    const { name, password } = await req.json();
    const user = await User.findById(payload.id);

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (name) user.username = name;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    return NextResponse.json({ message: "Profile updated successfully" });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
