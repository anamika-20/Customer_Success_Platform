import { checkIfStakeHolder } from "../helpers/authHelper.js";
import Project from "../models/Project.js";
import MoMs from "../models/MoMs.js";
import User from "../models/User.js";

//@desc Create a new MoM  and associate it with a project
//@route POST /moms/:proj/add
//@access admin, projectmanager
const addMoM = async (req, res) => {
  try {
    const projectId = req.params.proj;
    const { email } = req.userDetails;
    const user = await User.findOne({ email });

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const isStakeHolder = await checkIfStakeHolder(projectId, user);
    if (user.role !== "admin" && !isStakeHolder) {
      return res.status(403).json({
        message: "You are not authorized to access this project.",
      });
    }
    const newMoM = new MoMs(req.body);

    await newMoM.save();

    project.moms.push(newMoM._id);

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//@desc Edit a mom
//@route PUT /moms/:proj/:id/edit
//@access admin, projectmanager
const editMoM = async (req, res) => {
  try {
    const { proj: projectId, id } = req.params;
    const { email } = req.userDetails;
    const user = await User.findOne({ email });

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const isStakeHolder = await checkIfStakeHolder(projectId, user);
    if (user.role !== "admin" && !isStakeHolder) {
      return res.status(403).json({
        message: "You are not authorized to access this project.",
      });
    }

    const updatedMoM = await MoMs.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMoM) {
      return res.status(404).json({ message: "MoM not found." });
    }

    res.status(200).json({ message: updatedMoM.name + " edited successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Delete a mom from project also
//@route POST /moms/:proj/:id/delete
//@access admin, projectmanager
const deleteMoM = async (req, res) => {
  try {
    const { proj: projectId, id } = req.params;
    const { email } = req.userDetails;
    const user = await User.findOne({ email });

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const isStakeHolder = await checkIfStakeHolder(projectId, user);
    if (user.role !== "admin" && !isStakeHolder) {
      return res.status(403).json({
        message: "You are not authorized to access this project.",
      });
    }
    // Delete mom from MoM collection
    const deletedMoM = await MoMs.findByIdAndDelete(id);

    if (!deletedMoM) {
      return res.status(404).json({ message: "MoM not found." });
    }
    // Remove mom ID from array of MoMs in Project collection
    await Project.updateOne({ _id: projectId }, { $pull: { moms: id } });
    return res
      .status(200)
      .json({ message: deletedMoM.name + " deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addMoM, editMoM, deleteMoM };
