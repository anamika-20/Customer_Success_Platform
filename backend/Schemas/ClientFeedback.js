import mongoose from "mongoose";

const clientFeedbackSchema = new mongoose.Schema({
  feedbackType: String,
  dateReceived: Date,
  detailedFeedback: String,
  actionTaken: String,
  closureDate: Date,
});

const ClientFeedback = mongoose.model("ClientFeedback", clientFeedbackSchema);

export default ClientFeedback;
