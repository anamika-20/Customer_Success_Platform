import mongoose from "mongoose";

const teamResourceSchema = new mongoose.Schema({
  numberOfResources: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
});

const approvedTeamsSchema = new mongoose.Schema({
  PhaseNumber: {
    type: String,
    required: true
  },
  teamResources: {
    type: [teamResourceSchema],
    required: true
  },
  // project_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Project', 
  //   required: true
  // }
},

{
  timestamps: true // Enable timestamps
});

const ApprovedTeams = mongoose.model("ApprovedTeams", approvedTeamsSchema);

export default ApprovedTeams;
