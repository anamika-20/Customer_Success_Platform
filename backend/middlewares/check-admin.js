import User from "../Schemas/User.js";

export default async function checkAdmin(req, res, next) {
  // try {
  //   if (!req.oidc.isAuthenticated()) {
  //     return res.status(401).send("Unauthorized");
  //   }

  //   const { email } = req.oidc.user;
  //   const user = await User.findOne({ email });

  //   if (!user) {
  //     return res.status(404).send("User not found");
  //   }

  //   const { role } = user;

  //   if (!role || role !== "admin") {
  //     return res.status(403).send("You're not an admin");
  //   }

  //   // If the user is authenticated and has admin role, send the role in the response
  //   res.status(200).json({ role });

  // } catch (error) {
  //   console.error("Error in checkAdmin middleware:", error);
  //   res.status(500).send("Internal Server Error");
  // }
}
