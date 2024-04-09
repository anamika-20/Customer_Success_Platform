import mongoose, { Schema } from "mongoose";

const resourceSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    comments: { type: String, required: true },
  },
  { timestamps: true }
);

const Resources = mongoose.model("Resources", resourceSchema);

export default Resources;
