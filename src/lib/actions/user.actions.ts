import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";

interface Params {
  userId: string;
  name: string;
  email: string;
}

export async function updateUser({
  userId,
  name,
  email,
}: Params): Promise<void> {
  try {
    // Ensure DB connection
    await connectToDB();

    // Update user or create a new one if it doesn't exist
    await User.findOneAndUpdate(
      { id: userId },
      { name, email, onboarded: true },
      { upsert: true, new: true }
    );

    console.log("User successfully updated/created");
  } catch (error: any) {
    console.error("Failed to create/update user:", error.message);
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
