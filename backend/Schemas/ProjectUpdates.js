import mongoose from "mongoose";

const projectUpdatesSchema = new mongoose.Schema({
  date: Date,
  generalUpdates: String,
});

const ProjectUpdates = mongoose.model("ProjectUpdates", projectUpdatesSchema);

export default ProjectUpdates;
