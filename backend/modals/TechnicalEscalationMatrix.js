import mongoose from "mongoose";

const technicalEscalationMatrixSchema = new mongoose.Schema({
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

const TechnicalEscalationMatrix = mongoose.model("TechnicalEscalationMatrix", technicalEscalationMatrixSchema);

export default TechnicalEscalationMatrix;
