import TechnicalEscalationMatrix from "../modals/TechnicalEscalationMatrix.js";

// Get all version histories
export const getAllTechnicalEscalationMatrix = async (req, res) => {
  try {
    const technicalEscalationMatrix = await TechnicalEscalationMatrix.find();
    res.json(technicalEscalationMatrix);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single version history by ID
export const getTechnicalEscalationMatrixById = async (req, res) => {
  try {
    const technicalEscalationMatrix = await TechnicalEscalationMatrix.findById(req.params.id);
    if (!technicalEscalationMatrix) {
      res.status(404).json({ message: "TechnicalEscalationMatrix not found" });
      return;
    }
    res.json(technicalEscalationMatrix);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new version history
export const createTechnicalEscalationMatrix = async (req, res) => {
  const technicalEscalationMatrix = new TechnicalEscalationMatrix(req.body);
  try {
    const newTechnicalEscalationMatrix = await technicalEscalationMatrix.save();
    res.status(201).json(newTechnicalEscalationMatrix);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update version history
export const updateTechnicalEscalationMatrix = async (req, res) => {
  try {
    const technicalEscalationMatrix = await TechnicalEscalationMatrix.findById(req.params.id);
    if (!technicalEscalationMatrix) {
      res.status(404).json({ message: "TechnicalEscalationMatrix not found" });
      return;
    }
    // Update fields
    Object.assign(technicalEscalationMatrix, req.body);
    const updatedTechnicalEscalationMatrix = await technicalEscalationMatrix.save();
    res.json(updatedTechnicalEscalationMatrix);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete version history
export const deleteTechnicalEscalationMatrix = async (req, res) => {
  try {
    const technicalEscalationMatrix = await TechnicalEscalationMatrix.findById(req.params.id);
    if (!technicalEscalationMatrix) {
      return res.status(404).json({ message: "TechnicalEscalationMatrix not found" });
    }
    await TechnicalEscalationMatrix.deleteOne({ _id: req.params.id });
    return res.json({ message: "Deleted TechnicalEscalationMatrix History" });
  } catch (err) {
    console.error("Error deleting TechnicalEscalationMatrix:", err);
    return res.status(500).json({ message: "Failed to delete TechnicalEscalationMatrix" });
  }
};

export default{
    getAllTechnicalEscalationMatrix,
    getTechnicalEscalationMatrixById,
    createTechnicalEscalationMatrix,
    updateTechnicalEscalationMatrix,
    deleteTechnicalEscalationMatrix
}