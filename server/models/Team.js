import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema(
  {
    numberOfResources: { type: Number, required: true },
    role: { type: String, required: true },
    availabilityPercentage: { type: Number, required: true },
    duration: { type: Number, required: true },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
