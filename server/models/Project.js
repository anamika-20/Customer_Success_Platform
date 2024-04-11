import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    projectName: { type: String, unique: true, required: true },
    projectType: {
      type: String,
      enum: ["Fixed Budget", "Monthly"],
      required: true,
    },
    durationMonths: { type: Number, required: true },
    budgetedHours: { type: Number, required: true },
    projectDescription: { type: String, required: true },
    auditHistory: [{ type: Schema.Types.ObjectId, ref: "AuditHistory" }],
    versionHistory: [
      {
        versionNumber: { type: Number },
        version: {
          type: Schema.Types.ObjectId,
          ref: "VersionHistory",
        },
      },
    ],
    scope: { type: String },
    projectStack: {
      type: Schema.Types.ObjectId,
      ref: "ProjectStack",
    },
    operationalMatrix: [
      {
        escalationLevel: { type: Number },
        name: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    financialMatrix: [
      {
        escalationLevel: { type: Number },
        name: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    technicalMatrix: [
      {
        escalationLevel: { type: Number },
        name: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    stakeholders: {
      type: Schema.Types.ObjectId,
      ref: "StakeHolders",
      required: true, // Making the stakeholders field required
    },
    riskProfiling: [{ type: Schema.Types.ObjectId, ref: "RiskProfiling" }],
    phases: [
      {
        phaseNumber: { type: Number },
        phase: {
          type: Schema.Types.ObjectId,
          ref: "Phase",
        },
      },
    ],
    sprints: [
      {
        sprintNumber: { type: Number },
        sprint: {
          type: Schema.Types.ObjectId,
          ref: "Sprint",
        },
      },
    ],
    detailedTimelineReference: { type: String },
    approvedTeam: [
      {
        type: Schema.Types.ObjectId,
        ref: "ApprovedTeams",
      },
    ],
    resources: [
      {
        type: Schema.Types.ObjectId,
        ref: "Resources",
      },
    ],
    clientFeedback: [
      {
        type: Schema.Types.ObjectId,
        ref: "ClientFeedback",
      },
    ],
    projectUpdates: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProjectUpdates",
      },
    ],
    moms: [
      {
        type: Schema.Types.ObjectId,
        ref: "MoMs",
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
