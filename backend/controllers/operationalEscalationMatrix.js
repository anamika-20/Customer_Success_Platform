import OperationalEscalationMatrix from "../Schemas/OperationalEscalationMatrix.js";

// Get all version histories
export const getAllOperationalEscalationMatrix = async (req, res) => {
  try {
    const operationalEscalationMatrix = await OperationalEscalationMatrix.find();
    res.json(operationalEscalationMatrix);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single version history by ID
export const getOperationalEscalationMatrixById = async (req, res) => {
  try {
    const operationalEscalationMatrix = await OperationalEscalationMatrix.findById(req.params.id);
    if (!operationalEscalationMatrix) {
      res.status(404).json({ message: "OperationalEscalationMatrix not found" });
      return;
    }
    res.json(operationalEscalationMatrix);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new version history
export const createOperationalEscalationMatrix = async (req, res) => {
  const operationalEscalationMatrix = new OperationalEscalationMatrix(req.body);
  try {
    const newOperationalEscalationMatrix = await operationalEscalationMatrix.save();
    res.status(201).json(newOperationalEscalationMatrix);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update version history
export const updateOperationalEscalationMatrix = async (req, res) => {
  try {
    const operationalEscalationMatrix = await OperationalEscalationMatrix.findById(req.params.id);
    if (!operationalEscalationMatrix) {
      res.status(404).json({ message: "OperationalEscalationMatrix not found" });
      return;
    }
    // Update fields
    Object.assign(operationalEscalationMatrix, req.body);
    const updatedOperationalEscalationMatrix = await operationalEscalationMatrix.save();
    res.json(updatedOperationalEscalationMatrix);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete version history
export const deleteOperationalEscalationMatrix = async (req, res) => {
  try {
    const operationalEscalationMatrix = await OperationalEscalationMatrix.findById(req.params.id);
    if (!operationalEscalationMatrix) {
      return res.status(404).json({ message: "OperationalEscalationMatrix not found" });
    }
    await OperationalEscalationMatrix.deleteOne({ _id: req.params.id });
    return res.json({ message: "Deleted OperationalEscalationMatrix History" });
  } catch (err) {
    console.error("Error deleting OperationalEscalationMatrix:", err);
    return res.status(500).json({ message: "Failed to delete OperationalEscalationMatrix" });
  }
};

export default{
    getAllOperationalEscalationMatrix,
    getOperationalEscalationMatrixById,
    createOperationalEscalationMatrix,
    updateOperationalEscalationMatrix,
    deleteOperationalEscalationMatrix
}