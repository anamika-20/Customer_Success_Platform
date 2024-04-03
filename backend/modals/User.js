import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  role: { type: String, default: "client" }, // Default role is 'client'
});

const User = mongoose.model("User", userSchema);
export default User;
