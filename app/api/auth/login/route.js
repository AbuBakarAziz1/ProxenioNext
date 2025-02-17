import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) return Response.json({ error: "Invalid credentials" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return Response.json({ error: "Invalid credentials" }, { status: 401 });

    const token = jwt.sign({ id: user._id, role: user.role, email: user.email, name: user.username, profilePicture: user.profilePicture }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const cookieStore = await cookies();
    cookieStore.set("authToken", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", // Secure only in production
      sameSite: "lax",  //  "Lax" mode allows local dev without HTTPS
      path: "/",
      maxAge: 3600, // 1 hour
    });

    return Response.json(
      { user: { id: user._id, name: user.username, email: user.email, role: user.role, profilePicture: user.profilePicture }, token },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: "Error logging in" }, { status: 500 });
  }
}
