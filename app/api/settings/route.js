import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Setting from "@/models/Setting";
import { verifyToken } from "@/utils/auth";

// ✅ Get All Settings (Admin & Moderator)
export async function GET(req) {
  await connectDB();
  const user = await verifyToken(req);

  if (!user || (user.role !== "admin" && user.role !== "moderator")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const settings = await Setting.find({});
  return NextResponse.json(settings);
}

// ✅ Create a New Setting (Admin Only)
export async function POST(req) {
  await connectDB();
  const user = await verifyToken(req);

  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { transactionType, amount } = await req.json();
  const newSetting = new Setting({ transactionType, amount });
  await newSetting.save();

  return NextResponse.json({ message: "Setting created successfully", newSetting });
}

// ✅ Update a Setting (Admin & Moderator)
export async function PUT(req) {
  await connectDB();
  const user = await verifyToken(req);

  if (!user || (user.role !== "admin" && user.role !== "moderator")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { id, transactionType, amount } = await req.json();
  const updatedSetting = await Setting.findByIdAndUpdate(id, { transactionType, amount }, { new: true });

  return NextResponse.json({ message: "Setting updated successfully", updatedSetting });
}

// ✅ Delete a Setting (Admin Only)
export async function DELETE(req) {
  await connectDB();
  const user = await verifyToken(req);

  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = await req.json();
  await Setting.findByIdAndDelete(id);

  return NextResponse.json({ message: "Setting deleted successfully" });
}
