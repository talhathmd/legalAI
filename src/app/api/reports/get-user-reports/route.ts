import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import Report from "@/lib/models/report.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    await connectToDB();
    const user = await User.findOne({ email: new RegExp(`^${email}$`, "i") });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const fileIds = user.reports || [];
    if (fileIds.length === 0) {
      return NextResponse.json({ reports: [] }, { status: 200 });
    }

    const reports = await Report.find({ fileId: { $in: fileIds } });
    return NextResponse.json({ reports }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user's reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}
