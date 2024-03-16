import mongoose from "mongoose";

const phasesMilestonesSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', 
    required: true
  },
  title: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  completionDate: {
    type: Date,
    required: true
  },
  approvalDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Delayed', 'On-time', 'Sign-off Pending', 'Signed-off'],
    required: true
  },
  revisedCompletionDate: {
    type: Date
  },
  comments: {
    type: String
  }
}, {
  timestamps: true
});


const PhasesMilestones = mongoose.model("PhasesMilestones", phasesMilestonesSchema);

export default PhasesMilestones;
