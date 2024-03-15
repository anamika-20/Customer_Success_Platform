import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  projectName: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  scope: {
      type: String,
      required: true
  },
  techstack: {
    type: String,
    enum: ['Backend', 'Frontend', 'Mobile App', 'Database', 'Infrastructure and Services'],
    required: true
  },
  projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  projectUpdates: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProjectUpdates'
  }],
  resources: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource'
  }],
  clientFeedback: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClientFeedback'
  }],
  approvedTeams: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ApprovedTeams'
  }],
  moms: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MoM'
  }],
project_budget: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectBudget",
    },
],
risk_profiling: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RiskProfiling",
    },
],
project_phases: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Phases",
    },
],
sprint_detail: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SprintDetail",
    },
],
stakeholders: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stakeholders",
    },
],
audit_history: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AuditHistory",
    },
],
financial_matrix: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FinancialEscalationMatrix",
    },
],
operational_matrix: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OperationalEscalationMatrix",
    },
],
technical_matrix: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TechnicalEscalationMatrix",
    },
],
version_history: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VersionHistory",
    },
],
},
{ timestamps: true });
const Project = mongoose.model("Project", ProjectSchema);
export default Project;