import RiskProfiling from "../modals/RiskProfiling.js"

// Get all risk profilings
export const getAllRiskProfilings = async (req, res) => {
  try {
    const riskProfilings = await RiskProfiling.find();
    res.json(riskProfilings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single risk profiling by ID
export const getRiskProfilingById = async (req, res) => {
  try {
    const riskProfiling = await RiskProfiling.findById(req.params.id);
    if (!riskProfiling) {
      res.status(404).json({ message: "Risk Profiling not found" });
      return;
    }
    res.json(riskProfiling);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new risk profiling
export const createRiskProfiling = async (req, res) => {
  const riskProfiling = new RiskProfiling(req.body);
  try {
    const newRiskProfiling = await riskProfiling.save();
    res.status(201).json(newRiskProfiling);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update risk profiling
export const updateRiskProfiling = async (req, res) => {
  try {
    const riskProfiling = await RiskProfiling.findById(req.params.id);
    if (!riskProfiling) {
      res.status(404).json({ message: "Risk Profiling not found" });
      return;
    }
    // Update fields if present in the request body
    Object.assign(riskProfiling, req.body);
    const updatedRiskProfiling = await riskProfiling.save();
    res.json(updatedRiskProfiling);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete risk profiling
export const deleteRiskProfiling = async (req, res) => {
  try {
    const riskProfiling = await RiskProfiling.findById(req.params.id);
    if (!riskProfiling) {
      return res.status(404).json({ message: "Risk Profiling not found" });
    }
    await RiskProfiling.deleteOne({ _id: req.params.id });
    return res.json({ message: "Deleted Risk Profiling" });
  } catch (err) {
    console.error("Error deleting Risk Profiling:", err);
    return res.status(500).json({ message: "Failed to delete Risk Profiling" });
  }
};

export default {
    getAllRiskProfilings,
    getRiskProfilingById,
    createRiskProfiling,
    updateRiskProfiling,
    deleteRiskProfiling,
}