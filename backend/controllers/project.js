import Project from "../modals/Project.js";
import User from "../modals/User.js";

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new project
export const createProject = async (req, res) => {
  const project = new Project(req.body);
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update project by ID
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    Object.assign(project, req.body);
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete project by ID
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    await project.remove();
    return res.json({ message: "Deleted project" });
  } catch (err) {
    console.error("Error deleting project:", err);
    return res.status(500).json({ message: "Failed to delete project" });
  }
};
export const getProjectByUserEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.mail });
    if (user) {
      const projects = await Project.find({
        $or: [{ client: user }, { projectManager: user }],
      });
      res.json(projects);
    } else res.json("not a valid user");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export all functions as an object
export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectByUserEmail,
};
