import mongoose from "mongoose";

const VersionHistorySchema = new mongoose.Schema({
versionNumber : {
    type: String,
    required: true
},
type : {
    type: String,
    required: true
},
change : {
    type: String,
    required: true
},
changeReason : {
    type: String,
    required: true
},
createdBy: {
    type: String,
    required: true
    },
revisionDate: {
    type: Date,
    required: true
},
approvalDate: {
    type: Date,
    required: true
},
approvedBy: {
    type: String,
    required: true
},
// project_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Project', 
//     required: true
// }
},
{ timestamps: true });

const VersionHistory = mongoose.model("VersionHistory", VersionHistorySchema);

export default VersionHistory;