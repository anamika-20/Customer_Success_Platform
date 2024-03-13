import User from "../schemas/User.js";

export default async function checkAuditor(req, res, next) {
  try {
    if (!req.oidc.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }

    const { email } = req.oidc.user;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const { role } = user;

    if (!role || role !== "auditor") {
      return res.status(403).send("You're not an auditor");
    }

    // If the user is authenticated and has Auditor role, send the role in the response
    res.status(200).json({ role });

  } catch (error) {
    console.error("Error in checkAuditor middleware:", error);
    res.status(500).send("Internal Server Error");
  }
}
