import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { userId, username, email } = body;

    // Log the incoming data for debugging
    console.log("Incoming data: ", { userId, username, email });

    if (!userId || !email) {
      console.error("User ID or email missing.");
      return NextResponse.json({ error: "User ID and email are required" }, { status: 400 });
    }

    await connectToDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    console.log("Existing user: ", existingUser);

    if (!existingUser) {
      // Create a new user if they don't exist
      await User.create({
        username: username || userId, // If no username, fall back to userId
        email,
      });
      console.log("User created successfully.");
      return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    }

    console.log("User already exists.");
    return NextResponse.json({ message: "User already exists" }, { status: 200 });
  } catch (error) {
    console.error("Failed to create or update user:", error);
    return NextResponse.json({ error: "Failed to create or update user" }, { status: 500 });
  }
};
