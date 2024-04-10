import { checkIfStakeHolder } from "../helpers/authHelper.js";
import Project from "../models/Project.js";
import ClientFeedback from "../models/ClientFeedback.js";
import User from "../models/User.js";

//@desc Create a new clientFeedback and associate it with a project
//@route POST /clientFeedback/:proj/add
//@access admin, projectmanager
const addClientFeedback = async (req, res) => {
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
    const newClientFeedback = new ClientFeedback(req.body);

    await newClientFeedback.save();

    project.clientFeedback.push(newClientFeedback._id);

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Edit a ClientFeedback
//@route PUT /clientFeedback/:proj/:id/edit
//@access admin, projectmanager
const editClientFeedback = async (req, res) => {
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

    const updatedClientFeedback = await ClientFeedback.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedClientFeedback) {
      return res.status(404).json({ message: "Client Feedback not found." });
    }

    res
      .status(200)
      .json({ message: updatedClientFeedback.name + " edited successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Delete a ClientFeedback from project also
//@route POST /clientFeedback/:proj/:id/delete
//@access admin, projectmanager
const deleteClientFeedback = async (req, res) => {
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
    // Delete ClientFeedback from ClientFeedback collection
    const deletedClientFeedback = await ClientFeedback.findByIdAndDelete(id);

    if (!deletedClientFeedback) {
      return res.status(404).json({ message: "ClientFeedback not found." });
    }
    // Remove ClientFeedback ID from array of ClientFeedbacks in Project collection
    await Project.updateOne(
      { _id: projectId },
      { $pull: { clientFeedback: id } }
    );
    return res
      .status(200)
      .json({ message: deletedClientFeedback.name + " deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addClientFeedback, editClientFeedback, deleteClientFeedback };
