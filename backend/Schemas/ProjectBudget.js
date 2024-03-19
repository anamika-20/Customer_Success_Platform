import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  projectType: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  budgetedHours: {
    type: String,
    required: true
  },
  // project_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Project', 
  //   required: true
  // }
},
  { timestamps: true });

const ProjectBudget = mongoose.model("ProjectBudget", BudgetSchema);

export default ProjectBudget;
