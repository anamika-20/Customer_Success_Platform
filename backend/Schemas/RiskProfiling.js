import mongoose from "mongoose";

const riskProfilingSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', 
    required: true
  },
  riskType: {
    type: String,
    enum: ['Financial', 'Operational', 'Technical', 'HR', 'External'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true
  },
  impact: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true
  },
  remedialSteps: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  closureDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true 
});

const RiskProfiling = mongoose.model("RiskProfiling", riskProfilingSchema);

export default RiskProfiling;
