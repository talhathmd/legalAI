import mongoose from "mongoose";
import { string } from "zod";

const reportSchema = new mongoose.Schema({
  summary: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  filename: { type: String, required: false },
  fileUrl: {
    type: String,
  },
  fileId: {
    type: String,
    required: false,
  },
});

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default Report;
