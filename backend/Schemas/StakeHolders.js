import mongoose from "mongoose";

const stakeholdersSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', 
  },
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  }
}, {
  timestamps: true 
});

const Stakeholders = mongoose.model("Stakeholders", stakeholdersSchema);

export default Stakeholders;
