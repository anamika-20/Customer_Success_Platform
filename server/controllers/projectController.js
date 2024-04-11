import { checkIfStakeHolder } from "../helpers/authHelper.js";
import Project from "../models/Project.js";
import StakeHolders from "../models/StakeHolders.js";
import ProjectStack from "../models/ProjectStack.js";
import User from "../models/User.js";

//@desc Create New Project
//@route POST /project/add
//@access admin, projectmanager
const addProject = async (req, res) => {
  try {
    const data = req.body;
    const projectStack = {
      backend: [],
      frontend: [],
      mobileApp: [],
      database: [],
      infrastructureAndServices: [],
    };
    const { stakeholders, ...projectData } = data;

    const projectStackDoc = new ProjectStack(projectStack);
    const stakeholdersDoc = new StakeHolders(stakeholders);

    await projectStackDoc.save();
    await stakeholdersDoc.save();

    const projectStackId = projectStackDoc._id;
    const stakeholdersIds = stakeholdersDoc._id;

    const modifiedData = {
      ...projectData,
      projectStack: projectStackId,
      stakeholders: stakeholdersIds,
    };

    const newProject = new Project(modifiedData);
    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Delete Project
//@route DELETE /project/delete/:id
//@access admin, projectmanager
const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { email } = req.userDetails;
    const user = await User.findOne({ email });
    const isStakeHolder = await checkIfStakeHolder(projectId, user);
    if (user.role !== "admin" && !isStakeHolder) {
      return res.status(403).json({
        message: "You are not authorized to delete this project.",
      });
    }
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found." });
    }
    return res
      .status(200)
      .json({ message: deletedProject.projectName + " deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Get One Project
//@route GET /project/:id
//@access public
const getProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { email } = req.userDetails;
    const user = await User.findOne({ email });
    const isStakeHolder = await checkIfStakeHolder(projectId, user);
    if (user.role !== "admin" && !isStakeHolder) {
      return res.status(403).json({
        message: "You are not authorized to access this project.",
      });
    }

    const project = await Project.findById(projectId)
      .populate("resources")
      .populate("projectStack")
      .populate("projectUpdates")
      .populate("clientFeedback")
      .populate("moms")
      .populate("riskProfiling")
      .populate("phases.phase")
      .populate("sprints.sprint")
      .populate({
        path: "versionHistory.version",
        model: "VersionHistory",
        populate: {
          path: "createdBy approvedBy",
          model: "User",
        },
      })
      .populate({
        path: "auditHistory",
        model: "AuditHistory",
        populate: {
          path: "reviewedBy",
          model: "User",
        },
      })
      .populate({
        path: "financialMatrix.name",
        model: "User",
      })
      .populate({
        path: "technicalMatrix.name",
        model: "User",
      })
      .populate({
        path: "operationalMatrix.name",
        model: "User",
      })
      .populate({
        path: "stakeholders",
        populate: {
          path: "PM Auditor Client",
          model: "User",
        },
      });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Get All Projects for User
//@route GET /projects
//@access public
const getAllProjects = async (req, res) => {
  try {
    const { email } = req.userDetails;
    const user = await User.findOne({ email });

    const stakeHolders = await StakeHolders.find({
      $or: [{ PM: user._id }, { Auditor: user._id }, { Client: user._id }],
    });

    if (!stakeHolders) {
      return res.status(404).json({ message: "No projects found" });
    }

    const projectIds = stakeHolders.map((stakeHolder) => stakeHolder._id);

    const query =
      user.role !== "admin" ? { stakeholders: { $in: projectIds } } : {};
    const projects = await Project.find(query)
      .populate("resources")
      .populate("projectStack")
      .populate("projectUpdates")
      .populate("clientFeedback")
      .populate("moms")
      .populate("riskProfiling")
      .populate("phases.phase")
      .populate("sprints.sprint")
      .populate({
        path: "versionHistory.version",
        model: "VersionHistory",
        populate: {
          path: "createdBy approvedBy",
          model: "User",
        },
      })
      .populate({
        path: "auditHistory",
        model: "AuditHistory",
        populate: {
          path: "reviewedBy",
          model: "User",
        },
      })
      .populate({
        path: "financialMatrix.name",
        model: "User",
      })
      .populate({
        path: "technicalMatrix.name",
        model: "User",
      })
      .populate({
        path: "operationalMatrix.name",
        model: "User",
      })
      .populate({
        path: "stakeholders",
        populate: {
          path: "PM Auditor Client",
          model: "User",
        },
      });

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Edit Project
//@route PUT /project/edit/:id
//@access admin, projectmanager
const editProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { email } = req.userDetails;
    const user = await User.findOne({ email });

    const isStakeHolder = await checkIfStakeHolder(projectId, user);
    if (user.role !== "admin" && !isStakeHolder) {
      return res.status(403).json({
        message: "You are not authorized to edit this project.",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addProject, deleteProject, getProject, getAllProjects, editProject };
