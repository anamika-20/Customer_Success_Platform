import asyncHandler from "express-async-handler";
import { findOne, create, find } from "../models/userModel";
import generateToken from "../config/generateToken";

const registerUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  const userExists = await findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Alreday Exists");
  }
  const user = await create({ email });
  if (user) {
    res.status(201).json({
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});
export default { registerUser, authUser };
