import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { username, email, password, role } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) return Response.json({ error: "User already exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    return Response.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Error registering user" }, { status: 500 });
  }
}
