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
    const newSprint = new Sprint(req.body);

    await newSprint.save();

    project.sprints.push({
      phaseNumber: project.sprints.length + 1,
      phase: newSprint._id,
    });

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addSprint };
