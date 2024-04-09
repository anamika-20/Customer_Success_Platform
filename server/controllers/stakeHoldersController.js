import Project from "../models/Project.js";
import StakeHolders from "../models/StakeHolders.js";

//@desc Update Stakeholders
//@route PUT /stakeholders/:proj/edit
//@access admin
const updateStakeholders = async (req, res) => {
  try {
    const projectId = req.params.proj;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const stakeHoldersId = project.stakeholders;
    const updatedStakeHolders = await StakeHolders.findByIdAndUpdate(
      stakeHoldersId,
      req.body,
      { new: true }
    );

    res.status(200).json({ updatedStakeHolders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { updateStakeholders };
