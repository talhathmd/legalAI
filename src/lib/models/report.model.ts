import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  summary: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  filename: { type: String, required: true },
  fileUrl: {
    type: String,
  },
});

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default Report;
