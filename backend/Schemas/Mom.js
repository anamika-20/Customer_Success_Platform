import mongoose from "mongoose";

const momSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  momLink: {
    type: String,
    required: true
  },
  comments: {
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

const MoM = mongoose.model("MoM", momSchema);

export default MoM;
