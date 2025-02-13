import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) return Response.json({ error: "Invalid credentials" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return Response.json({ error: "Invalid credentials" }, { status: 401 });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return Response.json({ token, role: user.role, username: user.username }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Error logging in" }, { status: 500 });
  }
}
