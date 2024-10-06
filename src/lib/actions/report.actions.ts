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
    const reports = await Report.find({}, 'fileId');

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

export async function fetchAllReportIds() {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch all reports and return their fileId fields
    const reports = await Report.find({}, 'fileId'); // Only return the fileId field

    // Map through the results to extract fileIds
    return reports.map((report) => report.fileId);
  } catch (error: any) {
    console.error(`Error fetching report IDs: ${error.message}`);
    throw new Error("Error fetching report IDs");
  }
}


