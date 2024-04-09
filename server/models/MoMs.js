import mongoose, { Schema } from "mongoose";

const momsSchema = new Schema(
  {
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    momLink: { type: String, required: true },
    comments: { type: String, required: true },
  },
  { timestamps: true }
);

const MoMs = mongoose.model("MoMs", momsSchema);

export default MoMs;
