"use server";
import { connectToDB } from "../mongoose";
import Report from "../models/report.model";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { model } from "mongoose";
import mongoose from "mongoose";

interface Params {
  summary: string;
  author: string;
  filename: string;
  fileUrl: string;
  fileId: string;
}

export async function createReport({
  summary,
  author,
  filename,
  fileUrl,
  fileId,
}: Params) {
  try {
    connectToDB();

    const createdReport = await Report.create({
      summary,
      author,
      filename,
      fileUrl,
      fileId,
    });

    await User.findOneAndUpdate(
      { email: author },
      {
        $push: { reports: createdReport._id },
      }
    );
  } catch (error: any) {
    console.error(`Error creating report: ${error}`);
  }
}

export async function fetchReport(fileId: string) {
  try {
    // Connect to the database
    await connectToDB();

    // Find the report by fileId instead of _id
    const report = await Report.findOne({ fileId: fileId });

    // If no report is found, throw an error
    if (!report) {
      throw new Error("Report not found");
    }

    // Return the report data
    return report;
  } catch (error: any) {
    console.error(`Error fetching report: ${error}`);
    throw new Error("Error fetching report");
  }
}
