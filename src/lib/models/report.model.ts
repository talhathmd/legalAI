import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  summary: {
    type: String,
    required: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  filename: { type: String, required: false },
  fileUrl: {
    type: String,
  },
});

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default Report;
