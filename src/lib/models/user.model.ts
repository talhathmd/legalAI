import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
