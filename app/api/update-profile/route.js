import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      userId, fullName, gender, age, phone, country, city, state,
      education, profession, aboutMe, travelInterest, hobbiesInterest,
      profilePicture, videoIntroduction
    } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const parsedTravelInterest = typeof travelInterest === "string" ? travelInterest.split(",").map(item => item.trim()) : travelInterest;
    const parsedHobbiesInterest = typeof hobbiesInterest === "string" ? hobbiesInterest.split(",").map(item => item.trim()) : hobbiesInterest;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName, gender, age, phone, country, city, state,
        education, profession, aboutMe,
        travelInterest: parsedTravelInterest,
        hobbiesInterest: parsedHobbiesInterest,
        profilePicture, videoIntroduction,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
  }
}
