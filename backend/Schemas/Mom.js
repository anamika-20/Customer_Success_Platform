import mongoose from "mongoose";

const momSchema = new mongoose.Schema({
  date: Date,
  duration: String,
  momLink: String,
  comments: String,
});

const MoM = mongoose.model("MoM", momSchema);

export default MoM;
