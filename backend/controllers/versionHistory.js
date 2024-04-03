import VersionHistory from "../modals/VersionHistory.js";

// Get all version histories
export const getAllVersionHistory = async (req, res) => {
  try {
    const versionHistory = await VersionHistory.find();
    res.json(versionHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single version history by ID
export const getVersionHistoryById = async (req, res) => {
  try {
    const versionHistory = await VersionHistory.findById(req.params.id);
    if (!versionHistory) {
      res.status(404).json({ message: "Version History not found" });
      return;
    }
    res.json(versionHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new version history
export const createVersionHistory = async (req, res) => {
  const versionHistory = new VersionHistory(req.body);
  try {
    const newVersionHistory = await versionHistory.save();
    res.status(201).json(newVersionHistory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update version history
export const updateVersionHistory = async (req, res) => {
  try {
    const versionHistory = await VersionHistory.findById(req.params.id);
    if (!versionHistory) {
      res.status(404).json({ message: "Version History not found" });
      return;
    }
    // Update fields
    Object.assign(versionHistory, req.body);
    const updatedVersionHistory = await versionHistory.save();
    res.json(updatedVersionHistory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete version history
export const deleteVersionHistory = async (req, res) => {
  try {
    const versionHistory = await VersionHistory.findById(req.params.id);
    if (!versionHistory) {
      return res.status(404).json({ message: "Version History not found" });
    }
    await VersionHistory.deleteOne({ _id: req.params.id });
    return res.json({ message: "Deleted Version History" });
  } catch (err) {
    console.error("Error deleting Version History:", err);
    return res.status(500).json({ message: "Failed to delete Version History" });
  }
};

export default{
    getAllVersionHistory,
    getVersionHistoryById,
    createVersionHistory,
    updateVersionHistory,
    deleteVersionHistory
}