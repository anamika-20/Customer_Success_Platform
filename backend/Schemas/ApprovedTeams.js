import mongoose from "mongoose";

const teamResourceSchema = new mongoose.Schema({
  numberOfResources: String,
  role: String,
  availability: String,
  duration: Number,
});

const approvedTeamsSchema = new mongoose.Schema({
  PhaseNumber: String,
  teamResources: [teamResourceSchema],
});

const ApprovedTeams = mongoose.model("ApprovedTeams", approvedTeamsSchema);

export default ApprovedTeams;
