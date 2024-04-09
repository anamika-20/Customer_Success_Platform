import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String, unique: true },
  name: { type: String },
  role: { type: String, default: "client" }, // Default role is 'client'
});

const User = mongoose.model("User", userSchema);

export default User;
