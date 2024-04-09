import mongoose, { Schema } from "mongoose";

const phaseSchema = new Schema(
  {
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    completionDate: { type: Date, required: true },
    approvalDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Delayed", "On-time", "Sign-off Pending", "Signed-off"],
      required: true,
    },
    revisedCompletionDate: { type: Date, required: true },
    comments: { type: String, required: true },
  },
  { timestamps: true }
);

const Phase = mongoose.model("Phase", phaseSchema);

export default Phase;
