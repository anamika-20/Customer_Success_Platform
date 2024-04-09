import axios from "axios";
import User from "../models/User.js";

export default async function extractUserData(req, res, next) {
  const accessToken = req?.headers?.authorization?.split(" ")[1];
  if (accessToken) {
    try {
      const response = await axios.get(
        "https://dev-3esj1ci31pl5sjji.us.auth0.com/userInfo",
        { headers: { Authorization: "Bearer " + accessToken } }
      );
      if (response) {
        const { email } = response.data;

        const user = await User.findOne({ email });
        response.data.role = user.role;
      }
      req.userDetails = response.data;
    } catch (err) {
      console.error("Token error:", err);
    }
  }
  next();
}
