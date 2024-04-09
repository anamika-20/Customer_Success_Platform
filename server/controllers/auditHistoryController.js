import { checkIfStakeHolder } from "../helpers/authHelper.js";
import AuditHistory from "../models/AuditHistory.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

//@desc Create a new audit history and associate it with a project
//@route POST /auditHistory/:proj/add
//@access admin, auditor
const addAuditHistory = async (req, res) => {
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
    const newAuditHistory = new AuditHistory(req.body);

    await newAuditHistory.save();

    project.auditHistory.push(newAuditHistory._id);

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addAuditHistory };
