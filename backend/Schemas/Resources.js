import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  resourceName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  comment: {
    type: String,
    required: true
  },project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', 
    required: true
  }},
  {
  timestamps: true 
});

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
