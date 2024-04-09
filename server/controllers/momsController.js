import { checkIfStakeHolder } from "../helpers/authHelper.js";
import Project from "../models/Project.js";
import MoMs from "../models/MoMs.js";
import User from "../models/User.js";

//@desc Create a new MoM  and associate it with a project
//@route POST /moms/:proj/add
//@access admin, projectmanager
const addMoM = async (req, res) => {
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
    const newMoM = new MoMs(req.body);

    await newMoM.save();

    project.moms.push(newMoM._id);

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addMoM };
