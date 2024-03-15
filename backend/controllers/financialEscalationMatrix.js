import FinancialEscalationMatrix from "../Schemas/FinancialEscalationMatrix.js";

// Get all version histories
export const getAllFinancialEscalationMatrix = async (req, res) => {
  try {
    const financialEscalationMatrix = await FinancialEscalationMatrix.find();
    res.json(financialEscalationMatrix);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single version history by ID
export const getFinancialEscalationMatrixById = async (req, res) => {
  try {
    const financialEscalationMatrix = await FinancialEscalationMatrix.findById(req.params.id);
    if (!financialEscalationMatrix) {
      res.status(404).json({ message: "FinancialEscalationMatrix not found" });
      return;
    }
    res.json(financialEscalationMatrix);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new version history
export const createFinancialEscalationMatrix = async (req, res) => {
  const financialEscalationMatrix = new FinancialEscalationMatrix(req.body);
  try {
    const newFinancialEscalationMatrix = await financialEscalationMatrix.save();
    res.status(201).json(newFinancialEscalationMatrix);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update version history
export const updateFinancialEscalationMatrix = async (req, res) => {
  try {
    const financialEscalationMatrix = await FinancialEscalationMatrix.findById(req.params.id);
    if (!financialEscalationMatrix) {
      res.status(404).json({ message: "FinancialEscalationMatrix not found" });
      return;
    }
    // Update fields
    Object.assign(financialEscalationMatrix, req.body);
    const updatedFinancialEscalationMatrix = await financialEscalationMatrix.save();
    res.json(updatedFinancialEscalationMatrix);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete version history
export const deleteFinancialEscalationMatrix = async (req, res) => {
  try {
    const financialEscalationMatrix = await FinancialEscalationMatrix.findById(req.params.id);
    if (!financialEscalationMatrix) {
      return res.status(404).json({ message: "FinancialEscalationMatrix not found" });
    }
    await FinancialEscalationMatrix.deleteOne({ _id: req.params.id });
    return res.json({ message: "Deleted FinancialEscalationMatrix History" });
  } catch (err) {
    console.error("Error deleting FinancialEscalationMatrix:", err);
    return res.status(500).json({ message: "Failed to delete FinancialEscalationMatrix" });
  }
};

export default{
    getAllFinancialEscalationMatrix,
    getFinancialEscalationMatrixById,
    createFinancialEscalationMatrix,
    updateFinancialEscalationMatrix,
    deleteFinancialEscalationMatrix
}