import User from "../Schemas/User.js";

export default async function checkAdmin(req, res, next) {
  try {
    const email = "anamikatiwary20@gmail.com";
    const user = await User.findOne({ email });
    if (!user) return next();
    if (user.role === "admin") next();
    else res.send("You're not an admin bro");
  } catch (e) {
    res.send(e);
  }
}
