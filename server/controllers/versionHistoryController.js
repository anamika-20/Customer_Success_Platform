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

//@desc Edit a versionHistory
//@route PUT /versionHistory/:proj/:id/edit
//@access admin, projectmanager
const editVersionHistory = async (req, res) => {
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

    const updatedVersionHistory = await VersionHistory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedVersionHistory) {
      return res.status(404).json({ message: "Version History not found." });
    }

    res.status(200).json({
      message:
        "Version Type: " + updatedVersionHistory.type + " edited successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Delete a versionHistory from project also
//@route DELETE /versionHistory/:proj/:id/delete
//@access admin, projectmanager
const deleteVersionHistory = async (req, res) => {
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
    // Delete vesrion from VersionHistory collection
    const deletedVersionHistory = await VersionHistory.findByIdAndDelete(id);

    if (!deletedVersionHistory) {
      return res.status(404).json({ message: "VersionHistory not found." });
    }

    // Find the index of the VersionHistory to be removed from the array
    const index = project.versionHistory.findIndex(
      (v) => v.version.toString() === id
    );

    // If the VersionHistory is not found in the project's versionHistory array, return 404
    if (index === -1) {
      return res
        .status(404)
        .json({ message: "VersionHistory not found in the project." });
    }

    // Remove the VersionHistory from the array
    project.versionHistory.splice(index, 1);

    // Update the versionNumber of subsequent VersionHistory objects
    for (let i = index; i < project.versionHistory.length; i++) {
      project.versionHistory[i].versionNumber -= 1;
      await project.versionHistory[i].save();
    }

    // Save the modified project
    await project.save();

    return res.status(200).json({
      message:
        "Version Type: " + deletedVersionHistory.type + " deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addVersionHistory, editVersionHistory, deleteVersionHistory };
