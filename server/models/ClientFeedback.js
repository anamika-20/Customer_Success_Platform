import mongoose, { Schema } from "mongoose";

const clientFeedbackSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Complaint", "Appreciation"],
      required: true,
    },
    dateReceived: { type: Date, required: true },
    detailedFeedback: { type: String, required: true },
    actionTaken: { type: String, required: true },
    closureDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const ClientFeedback = mongoose.model("ClientFeedback", clientFeedbackSchema);

export default ClientFeedback;
