export const userDetails = async (req, res) => {
  try {
    console.log("Request Headers:", req.headers);
    console.log("User Details:", req.oidc.user);
    res.json(JSON.stringify(req.oidc.user));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export default { userDetails };
