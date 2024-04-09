import mongoose, { Schema } from "mongoose";

const projectUpdatesSchema = new Schema(
  {
    date: { type: Date, required: true },
    generalUpdates: { type: String, required: true },
  },
  { timestamps: true }
);

const ProjectUpdates = mongoose.model("ProjectUpdates", projectUpdatesSchema);

export default ProjectUpdates;
