"use server";
import { connectToDB } from "../mongoose";
import Report from "../models/report.model";
import User from "../models/user.model";

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
      { email: author }, // Find the user by email
      {
        $push: { reports: createdReport.fileId }, // Push the report's fileId to the user's reports array
      },
      { new: true } // Return the updated user document
    );
  } catch (error: any) {
    console.error(`Error creating report: ${error.message}`);
    throw new Error("Error creating report");
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
