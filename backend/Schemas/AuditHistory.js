import mongoose from "mongoose";

const AuditHistorySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  reviewedBy: {
    type: String,
    required: true
  },
  status : {
    type: String,
    required: true
  },
  reviewedSection : {
    type: String,
    required: true
  },
  comments : {
    type: String,
    required: true
  },
  actionItem : {
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

const AuditHistory = mongoose.model("AuditHistory", AuditHistorySchema);

export default AuditHistory;