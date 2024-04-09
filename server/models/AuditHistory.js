import mongoose, { Schema } from "mongoose";

const auditHistorySchema = new Schema(
  {
    dateOfAudit: { type: Date, required: true },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, required: true },
    reviewedSection: { type: String, required: true },
    commentQueries: { type: String, required: true },
    actionItem: { type: String, required: true },
  },
  { timestamps: true }
);

const AuditHistory = mongoose.model("AuditHistory", auditHistorySchema);

export default AuditHistory;
