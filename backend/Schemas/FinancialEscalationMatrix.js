import mongoose from "mongoose";

const financialEscalationMatrixSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', 
    required: true
  },
  level: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true 
});

const FinancialEscalationMatrix = mongoose.model("FinancialEscalationMatrix", financialEscalationMatrixSchema);

export default FinancialEscalationMatrix;
