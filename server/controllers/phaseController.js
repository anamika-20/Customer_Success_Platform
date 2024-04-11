import { checkIfStakeHolder } from "../helpers/authHelper.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import Phase from "../models/Phase.js";

//@desc Create a new phase and associate it with a project
//@route POST /phase/:proj/add
//@access admin, projectMangager
const addPhase = async (req, res) => {
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
    const newPhase = new Phase(req.body);

    await newPhase.save();

    project.phases.push({
      phaseNumber: project.phases.length + 1,
      phase: newPhase._id,
    });

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//@desc Edit a phase
//@route PUT /phase/:proj/:id/edit
//@access admin, projectmanager
const editPhase = async (req, res) => {
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

    const updatedPhase = await Phase.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedPhase) {
      return res.status(404).json({ message: "Phase not found." });
    }

    res
      .status(200)
      .json({ message: updatedPhase.title + " edited successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Delete a phases from project also
//@route DELETE /phase/:proj/:id/delete
//@access admin, projectmanager
const deletePhase = async (req, res) => {
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
    // Delete vesrion from Phase collection
    const deletedPhase = await Phase.findByIdAndDelete(id);

    if (!deletedPhase) {
      return res.status(404).json({ message: "Phase not found." });
    }

    // Find the index of the Phase to be removed from the array
    const index = project.phases.findIndex((v) => v.phase.toString() === id);

    // If the Phase is not found in the project's phases array, return 404
    if (index === -1) {
      return res
        .status(404)
        .json({ message: "Phase not found in the project." });
    }

    // Remove the Phase from the array
    project.phases.splice(index, 1);

    // Update the phaseNumber of subsequent Phase objects
    for (let i = index; i < project.phases.length; i++) {
      project.phases[i].phaseNumber -= 1;
      await project.phases[i].save();
    }

    // Save the modified project
    await project.save();

    return res.status(200).json({
      message: deletedPhase.title + " deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addPhase, editPhase, deletePhase };
