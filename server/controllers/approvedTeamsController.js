import { checkIfStakeHolder } from "../helpers/authHelper.js";
import Project from "../models/Project.js";
import ApprovedTeams from "../models/ApprovedTeams.js";
import User from "../models/User.js";

//@desc Create a new Approved Teams and associate it with a project
//@route POST /teams/:proj/add
//@access admin, projectmanager
const addApprovedTeams = async (req, res) => {
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

    const newApprovedTeams = new ApprovedTeams(req.body);

    await newApprovedTeams.save();
    if (!project.approvedTeam) project.approvedTeam = [];
    project.approvedTeam.push(newApprovedTeams._id);

    await project.save();

    res.status(201).json({ message: "Team Added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Edit a Approved Teams
//@route PUT /teams/:proj/:id/edit
//@access admin, projectmanager
const editApprovedTeams = async (req, res) => {
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

    const updatedApprovedTeams = await ApprovedTeams.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedApprovedTeams) {
      return res.status(404).json({ message: "ApprovedTeams not found." });
    }

    res.status(200).json({
      message: "Teams edited successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Delete a Approved Teams from project also
//@route POST /teams/:proj/:id/delete
//@access admin, projectmanager
const deleteApprovedTeams = async (req, res) => {
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
    // Delete approved team from ApprovedTeams collection
    const deletedApprovedTeams = await ApprovedTeams.findByIdAndDelete(id);

    if (!deletedApprovedTeams) {
      return res.status(404).json({ message: "ApprovedTeams not found." });
    }
    // Remove a pproved team ID from array of ApprovedTeamss in Project collection
    await Project.updateOne(
      { _id: projectId },
      { $pull: { approvedTeam: id } }
    );
    return res.status(200).json({
      message:
        "Phase " + deletedApprovedTeams.phaseNumber + " deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addApprovedTeams, editApprovedTeams, deleteApprovedTeams };
