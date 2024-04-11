import mongoose, { Schema } from "mongoose";

const approvedTeamsSchema = new Schema({
  phaseNumber: {
    type: Number,
    required: true,
  },
  details: [
    {
      numberOfResources: {
        type: Number,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      availability: {
        type: Number,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
    },
  ],
});

const ApprovedTeams = mongoose.model("ApprovedTeams", approvedTeamsSchema);

export default ApprovedTeams;
