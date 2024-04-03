import ProjectBudget from "../modals/ProjectBudget.js";

// Get all project budgets
export const getAllProjectBudget = async (req, res) => {
  try {
    const projectBudget = await ProjectBudget.find();
    res.json(projectBudget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single project budget by ID
export const getProjectBudgetById = async (req, res) => {
  try {
    const projectBudget = await ProjectBudget.findById(req.params.id);
    if (!projectBudget) {
      res.status(404).json({ message: "Project Budget not found" });
      return;
    }
    res.json(projectBudget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new project budget
export const createProjectBudget = async (req, res) => {
  const projectBudget = new ProjectBudget(req.body);
  try {
    const newProjectBudget = await projectBudget.save();
    res.status(201).json(newProjectBudget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update project budget
export const updateProjectBudget = async (req, res) => {
  try {
    const projectBudget = await ProjectBudget.findById(req.params.id);
    if (!projectBudget) {
      return res.status(404).json({ message: "Project Budget not found" });
    }

    // Update fields if present in the request body
    if (req.body.projectType !== null) {
      projectBudget.projectType = req.body.projectType;
    }
    if (req.body.duration !== null) {
      projectBudget.duration = req.body.duration;
    }
    if (req.body.budgetedHours !== null) {
      projectBudget.budgetedHours = req.body.budgetedHours;
    }

    const updatedProjectBudget = await projectBudget.save();
    res.json(updatedProjectBudget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Delete project budget
export const deleteProjectBudget = async (req, res) => {
  try {
    const projectBudget = await ProjectBudget.findById(req.params.id);
    if (!projectBudget) {
      return res.status(404).json({ message: "Project Budget not found" });
    }
    await ProjectBudget.deleteOne({ _id: req.params.id });
    return res.json({ message: "Deleted Project Budget" });
  } catch (err) {
    console.error("Error deleting Project Budget:", err);
    return res.status(500).json({ message: "Failed to delete Project Budget" });
  }
};

export default {
    getAllProjectBudget,
    getProjectBudgetById,
    createProjectBudget,
    updateProjectBudget,
    deleteProjectBudget,
  };