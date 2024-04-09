import mongoose, { Schema } from "mongoose";

const sprintSchema = new Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Delayed", "On-time", "Sign-off Pending", "Signed-off"],
      required: true,
    },
    comments: { type: String, required: true },
  },
  { timestamps: true }
);

const Sprint = mongoose.model("Sprint", sprintSchema);

export default Sprint;
