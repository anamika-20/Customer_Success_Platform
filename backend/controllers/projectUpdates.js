import ProjectUpdates from "../Schemas/ProjectUpdates.js";

// Get all ProjectUpdates
export const getAllProjectUpdates = async (req, res) => {
  try {
    const projectUpdates = await ProjectUpdates.find();
    res.json(projectUpdates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single ProjectUpdates
export const getProjectUpdatesById = async (req, res) => {
  try {
    const updates = await ProjectUpdates.findById(req.params.id);
    if (!updates) {
      res.status(404).json({ message: "ProjectUpdates not found" });
      return;
    }
    res.json(updates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new ProjectUpdates
export const createProjectUpdates = async (req, res) => {
  const update = new ProjectUpdates(req.body);
  try {
    const newupdate = await update.save();
    res.status(201).json(newupdate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateProjectUpdates = async (req, res) => {
  try {
    const update = await ProjectUpdates.findById(req.params.id);
    if (!update) {
      res.status(404).json({ message: "ProjectUpdates not found" });
      return;
    }
    if (req.body.date != null) {
      update.date = req.body.date;
    }
    if (req.body.generalUpdates != null) {
      update.generalUpdates = req.body.generalUpdates;
    }

    const updatedProject = await update.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//delete
export const deleteProjectUpdates = async (req, res) => {
  try {
    const update = await ProjectUpdates.findById(req.params.id);
    if (!update) {
      return res.status(404).json({ message: "ProjectUpdates not found" });
    }

    // Delete the document using deleteOne method
    await ProjectUpdates.deleteOne({ _id: req.params.id });

    return res.json({ message: "Deleted ProjectUpdates" });
  } catch (err) {
    console.error("Error deleting ProjectUpdates:", err);
    return res.status(500).json({ message: "Failed to delete ProjectUpdates" });
  }
};

export default {
  getAllProjectUpdates,
  getProjectUpdatesById,
  createProjectUpdates,
  updateProjectUpdates,
  deleteProjectUpdates,
};
