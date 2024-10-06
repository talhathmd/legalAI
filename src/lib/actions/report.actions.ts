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
}

export async function createReport({
  summary,
  author,
  filename,
  fileUrl,
}: Params) {
  try {
    connectToDB();

    const createdReport = await Report.create({
      summary,
      author,
      filename,
      fileUrl,
    });

    await User.findByIdAndUpdate(author, {
      $push: { reports: createdReport._id },
    });
  } catch (error: any) {
    console.error(`Error creating report: ${error}`);
  }
}
