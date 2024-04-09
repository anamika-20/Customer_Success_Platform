import { request } from "express";
import User from "../models/User.js";

//@desc Create New User
//@route POST /user/add
//@access admin
const addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Delete User
//@route DELETE /user/delete/:id
//@access admin
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: deletedUser.email + " deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Get Users
//@route GET /user || /user?role=client || /user?role=projectmanager || /user?role=auditor
//@access public
const getUsers = async (req, res) => {
  try {
    let query = {};
    const role = req.query.role;

    if (role) {
      query = { role };
    }

    const users = await User.find(query);

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: `No users found for role: ${role || "all"}` });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRole = async (req, res) => {
  try {
    if (!req.userDetails) {
      return res.status(403).json({ error: "Access forbidden" });
    }

    res.status(200).json({ role: req.userDetails.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addUser, deleteUser, getUsers, getRole };
