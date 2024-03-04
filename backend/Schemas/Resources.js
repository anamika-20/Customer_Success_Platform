import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  resourceName: String,
  role: String,
  startDate: Date,
  endDate: Date,
  comment: String,
});

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
