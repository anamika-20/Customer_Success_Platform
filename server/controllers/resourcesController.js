import { checkIfStakeHolder } from "../helpers/authHelper.js";
import Project from "../models/Project.js";
import Resource from "../models/Resources.js";
import User from "../models/User.js";

//@desc Create a new resource and associate it with a project
//@route POST /resource/:proj/add
//@access admin, projectmanager
const addResource = async (req, res) => {
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
    const newResource = new Resource(req.body);

    await newResource.save();

    project.resources.push(newResource._id);

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Edit a resource
//@route PUT /resource/:proj/:id/edit
//@access admin, projectmanager
const editResource = async (req, res) => {
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

    const updatedResource = await Resource.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedResource) {
      return res.status(404).json({ message: "Resource not found." });
    }

    res
      .status(200)
      .json({ message: updatedResource.name + " edited successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Delete a resource from project also
//@route POST /resource/:proj/:id/delete
//@access admin, projectmanager
const deleteResource = async (req, res) => {
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
    // Delete resource from Resource collection
    const deletedResource = await Resource.findByIdAndDelete(id);

    if (!deletedResource) {
      return res.status(404).json({ message: "Resource not found." });
    }
    // Remove resource ID from array of Resources in Project collection
    await Project.updateOne({ _id: projectId }, { $pull: { resources: id } });

    return res
      .status(200)
      .json({ message: deletedResource.name + " deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addResource, editResource, deleteResource };
