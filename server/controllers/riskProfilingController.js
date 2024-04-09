import { checkIfStakeHolder } from "../helpers/authHelper.js";
import Project from "../models/Project.js";
import RiskProfiling from "../models/RiskProfiling.js";
import User from "../models/User.js";

//@desc Create a new Risk Profiling and associate it with a project
//@route POST /riskprofiling/:proj/add
//@access admin, projectmanager
const addRiskProfiling = async (req, res) => {
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
    const newRiskProfiling = new RiskProfiling(req.body);

    await newRiskProfiling.save();

    project.riskProfiling.push(newRiskProfiling._id);

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addRiskProfiling };
