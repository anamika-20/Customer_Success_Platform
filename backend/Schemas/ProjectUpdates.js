import mongoose from "mongoose";

const projectUpdatesSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  generalUpdates: {
    type: String,
    required: true
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', 
    required: true
  }},
  { timestamps: true });
const ProjectUpdates = mongoose.model("ProjectUpdates", projectUpdatesSchema);

export default ProjectUpdates;
