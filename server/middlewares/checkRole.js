import User from "../models/User.js";

export default async function checkRole(req, res, next, role) {
  try {
    if (!req.userDetails) {
      return res.status(403).json({ error: "Access forbidden" });
    }

    if (role.includes(req.userDetails.role)) {
      next();
    } else {
      return res.status(403).json({ error: "Access forbidden" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
