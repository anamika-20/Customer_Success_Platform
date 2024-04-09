import mongoose, { Schema } from "mongoose";

const projectStackSchema = new Schema(
  {
    backend: [{ type: String }],
    frontend: [{ type: String }],
    mobileApp: [{ type: String }],
    database: [{ type: String }],
    infrastructureAndServices: [{ type: String }],
  },
  { timestamps: true }
);

const ProjectStack = mongoose.model("ProjectStack", projectStackSchema);

export default ProjectStack;
