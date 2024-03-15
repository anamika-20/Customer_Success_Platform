import mongoose from "mongoose";

const sprintDetailSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', 
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Delayed', 'On-time', 'Sign-off Pending', 'Signed-off'],
    required: true
  },
  comments: {
    type: String
  }
}, {
  timestamps: true 
});


const SprintDetail = mongoose.model("SprintDetail", sprintDetailSchema);

export default SprintDetail;
