import User from "../Schemas/User.js";

export const userDetails = async (req, res) => {
  try {
    console.log("Request Headers:", req.headers);
    console.log("User Details:", req.oidc.user);
    res.json({ data: req.oidc.user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const isValidUser = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getRole = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (user) {
      res.json({ role: user?.role });
    } else {
      res.json({ role: "Does not Exists" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export default { userDetails, isValidUser, getRole };
