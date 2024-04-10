import Project from "../models/Project.js";
import ProjectStack from "../models/ProjectStack.js";

//@desc Update Project Stack
//@route PUT /projectstack/:proj/edit
//@access admin, projectmanager
const updateProjectStack = async (req, res) => {
  try {
    const projectId = req.params.proj;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const projectStackId = project.projectStack;
    const updatedProjectStack = await ProjectStack.findByIdAndUpdate(
      projectStackId,
      req.body,
      { new: true }
    );

    res.status(200).json({ updatedProjectStack });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { updateProjectStack };
