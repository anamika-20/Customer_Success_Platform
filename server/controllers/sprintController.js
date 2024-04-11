import { checkIfStakeHolder } from "../helpers/authHelper.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import Sprint from "../models/Sprint.js";

//@desc Create a new sprint and associate it with a project
//@route POST /sprint/:proj/add
//@access admin, projectMangager
const addSprint = async (req, res) => {
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
    const newSprint = new Sprint(req.body);

    await newSprint.save();

    project.sprints.push({
      sprintNumber: project.sprints.length + 1,
      sprint: newSprint._id,
    });

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Edit a sprint
//@route PUT /sprint/:proj/:id/edit
//@access admin, projectmanager
const editSprint = async (req, res) => {
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

    const updatedSprint = await Sprint.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedSprint) {
      return res.status(404).json({ message: "Sprint not found." });
    }

    res.status(200).json({
      message: "Sprint edited successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Delete a sprint from project also
//@route DELETE /sprint/:proj/:id/delete
//@access admin, projectmanager
const deleteSprint = async (req, res) => {
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
    // Delete vesrion from Sprint collection
    const deletedSprint = await Sprint.findByIdAndDelete(id);

    if (!deletedSprint) {
      return res.status(404).json({ message: "Sprint not found." });
    }

    // Find the index of the Sprint to be removed from the array
    const index = project.sprints.findIndex((v) => v.sprint.toString() === id);

    // If the Sprint is not found in the project's sprints array, return 404
    if (index === -1) {
      return res
        .status(404)
        .json({ message: "Sprint not found in the project." });
    }

    // Remove the Sprint from the array
    project.sprints.splice(index, 1);

    // Update the SprintNumber of subsequent Sprint objects
    for (let i = index; i < project.sprints.length; i++) {
      project.sprints[i].sprintNumber -= 1;
      await project.sprints[i].save();
    }

    // Save the modified project
    await project.save();

    return res.status(200).json({
      message: "Sprint deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addSprint, editSprint, deleteSprint };
