import mongoose from "mongoose";

const techStackSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', 
    required: true
  },
  category: {
    type: String,
    enum: ['Backend', 'Frontend', 'Mobile App', 'Database', 'Infrastructure and Services'],
    required: true
  }
}, {
  timestamps: true 
});

const TechStack = mongoose.model("TechStack", techStackSchema);

export default TechStack;
