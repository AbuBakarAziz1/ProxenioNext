import { jwtVerify } from "jose";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function verifyToken(req) {
  const token = req.cookies.get("authToken")?.value;
  if (!token) return null;

  try {
    await connectDB();
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const user = await User.findById(payload.id).select("-password");
    return user;
  } catch (error) {
    return null;
  }
}
