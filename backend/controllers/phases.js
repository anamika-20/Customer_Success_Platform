import Phases from "../Schemas/Phases.js";

// Get all phases/milestones
export const getAllPhases = async (req, res) => {
  try {
    const phases = await Phases.find();
    res.json(phases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single phase/milestone by ID
export const getPhasesById = async (req, res) => {
  try {
    const phase = await Phases.findById(req.params.id);
    if (!phase) {
      res.status(404).json({ message: "Phase/Milestone not found" });
      return;
    }
    res.json(phase);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new phase/milestone
export const createPhases = async (req, res) => {
  const phase = new Phases(req.body);
  try {
    const newPhase = await phase.save();
    res.status(201).json(newPhase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update phase/milestone
export const updatePhases = async (req, res) => {
  try {
    const phase = await Phases.findById(req.params.id);
    if (!phase) {
      res.status(404).json({ message: "Phase/Milestone not found" });
      return;
    }
    // Update fields if present in the request body
    Object.assign(phase, req.body);
    const updatedPhaseMilestone = await phase.save();
    res.json(updatedPhaseMilestone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete phase/milestone
export const deletePhases = async (req, res) => {
  try {
    const phase = await Phases.findById(req.params.id);
    if (!phase) {
      return res.status(404).json({ message: "Phase/Milestone not found" });
    }
    await Phases.deleteOne({ _id: req.params.id });
    return res.json({ message: "Deleted Phase/Milestone" });
  } catch (err) {
    console.error("Error deleting Phase/Milestone:", err);
    return res.status(500).json({ message: "Failed to delete Phase/Milestone" });
  }
};


export default {
    getAllPhases,
    getPhasesById,
    createPhases,
    updatePhases,
    deletePhases
}