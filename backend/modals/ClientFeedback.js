import mongoose from "mongoose";

const clientFeedbackSchema = new mongoose.Schema({
  feedbackType: {
    type: String,
    required: true
  },
  dateReceived: {
    type: Date,
    required: true
  },
  detailedFeedback: {
    type: String,
    required: true
  },
  actionTaken: {
    type: String,
    required: true
  },
  closureDate: {
    type: Date,
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

const ClientFeedback = mongoose.model("ClientFeedback", clientFeedbackSchema);

export default ClientFeedback;
