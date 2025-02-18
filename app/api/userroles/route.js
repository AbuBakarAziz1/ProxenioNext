import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; 
import User from "@/models/User"; 

export async function PUT(req) {
    try {
        await connectDB(); // Ensure the database is connected

        const { id, username, role } = await req.json(); // Extract data from request body

        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // Update user in MongoDB
        const updatedUser = await User.findByIdAndUpdate(id, { username, role }, { new: true });

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User role updated successfully", user: updatedUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


// Delete 
export async function DELETE(req) {
  await connectDB();

  const { id } = await req.json();
  await User.findByIdAndDelete(id);

  return NextResponse.json({ message: "User Role deleted successfully" });
}
