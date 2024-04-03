import mongoose from "mongoose";

const operationalEscalationMatrixSchema = new mongoose.Schema({
  // project_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Project', 
  //   required: true
  // },
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

const OperationalEscalationMatrix = mongoose.model("OperationalEscalationMatrix", operationalEscalationMatrixSchema);

export default OperationalEscalationMatrix;
