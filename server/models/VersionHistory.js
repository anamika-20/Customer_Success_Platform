import mongoose, { Schema } from "mongoose";

const versionHistorySchema = new Schema(
  {
    type: { type: String, required: true },
    change: { type: String, required: true },
    changeReason: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    revisionDate: { type: Date, required: true },
    approvalDate: { type: Date, required: true },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const VersionHistory = mongoose.model("VersionHistory", versionHistorySchema);

export default VersionHistory;
