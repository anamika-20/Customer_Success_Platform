import { checkIfStakeHolder } from "../helpers/authHelper.js";
import Project from "../models/Project.js";
import ProjectUpdates from "../models/ProjectUpdates.js";
import User from "../models/User.js";

//@desc Create a new ProjectUpdate  and associate it with a project
//@route POST /projectupdates/:proj/add
//@access admin, projectmanager
const addProjectUpdate = async (req, res) => {
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
    const newProjectUpdates = new ProjectUpdates(req.body);

    await newProjectUpdates.save();

    project.projectUpdates.push(newProjectUpdates._id);

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Edit a ProjectUpdate
//@route PUT /projectupdates/:proj/:id/edit
//@access admin, projectmanager
const editProjectUpdate = async (req, res) => {
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

    const updatedProjectUpdate = await ProjectUpdates.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedProjectUpdate) {
      return res.status(404).json({ message: "ProjectUpdate not found." });
    }

    res
      .status(200)
      .json({ message: updatedProjectUpdate.name + " edited successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Delete a ProjectUpdate from project also
//@route POST /projectupdates/:proj/:id/delete
//@access admin, projectmanager
const deleteProjectUpdate = async (req, res) => {
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
    // Delete ProjectUpdate from ProjectUpdate collection
    const deletedProjectUpdate = await ProjectUpdates.findByIdAndDelete(id);

    if (!deletedProjectUpdate) {
      return res.status(404).json({ message: "ProjectUpdate not found." });
    }
    // Remove ProjectUpdate ID from array of ProjectUpdates in Project collection
    await Project.updateOne(
      { _id: projectId },
      { $pull: { projectUpdates: id } }
    );
    return res
      .status(200)
      .json({ message: deletedProjectUpdate.name + " deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addProjectUpdate, editProjectUpdate, deleteProjectUpdate };
