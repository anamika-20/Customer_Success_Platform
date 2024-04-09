import { checkIfStakeHolder } from "../helpers/authHelper.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import VersionHistory from "../models/VersionHistory.js";

//@desc Create a new version history and associate it with a project
//@route POST /versionHistory/:proj/add
//@access admin, projectMangager
const addVersionHistory = async (req, res) => {
  try {
    const projectId = req.params.proj;
    const { email } = req.userDetails;
    const user = await User.findOne({ email });

    const isStakeHolder = await checkIfStakeHolder(projectId, user);
    if (user.role !== "admin" && !isStakeHolder) {
      return res.status(403).json({
        message: "You are not authorized to access this project.",
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    const newVersionHistory = new VersionHistory(req.body);

    await newVersionHistory.save();

    project.versionHistory.push({
      versionNumber: project.versionHistory.length + 1,
      version: newVersionHistory._id,
    });

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editVersionHistory = async (req, res) => {
  try {
    const { proj: projectId, id } = req.params;
    const { email } = req.userDetails;
    const user = await User.findOne({ email });

    const isStakeHolder = await checkIfStakeHolder(projectId, user);
    if (user.role !== "admin" && !isStakeHolder) {
      return res.status(403).json({
        message: "You are not authorized to access this project.",
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const updatedVersionHistory = await VersionHistory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedVersionHistory) {
      return res.status(404).json({ message: "Resource not found." });
    }

    res
      .status(200)
      .json({ message: updatedVersionHistory.name + " edited successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteVersionHistory = async (req, res) => {
  try {
    const { proj: projectId, id } = req.params;
    const { email } = req.userDetails;
    const user = await User.findOne({ email });

    const isStakeHolder = await checkIfStakeHolder(projectId, user);
    if (user.role !== "admin" && !isStakeHolder) {
      return res.status(403).json({
        message: "You are not authorized to access this project.",
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    // Delete resource from VersionHistory collection
    const deletedVersionHistory = await VersionHistory.findByIdAndDelete(id);

    if (!deletedVersionHistory) {
      return res.status(404).json({ message: "VersionHistory not found." });
    }
    // Remove resource ID from array of Resources in Project collection
    await Project.updateOne(
      { _id: projectId },
      { $pull: { versionHistory: id } }
    );
    return res
      .status(200)
      .json({ message: deletedVersionHistory.name + " deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addVersionHistory, editVersionHistory, deleteVersionHistory };
