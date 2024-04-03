import StakeHolders from "../modals/StakeHolders.js";

// Get all version histories
export const getAllStakeHolders = async (req, res) => {
  try {
    const stakeHolders = await StakeHolders.find();
    res.json(stakeHolders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single version history by ID
export const getStakeHoldersById = async (req, res) => {
  try {
    const stakeHolders = await StakeHolders.findById(req.params.id);
    if (!stakeHolders) {
      res.status(404).json({ message: "StakeHolders not found" });
      return;
    }
    res.json(stakeHolders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new version history
export const createStakeHolders = async (req, res) => {
  const stakeHolders = new StakeHolders(req.body);
  try {
    const newStakeHolders = await stakeHolders.save();
    res.status(201).json(newStakeHolders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update version history
export const updateStakeHolders = async (req, res) => {
  try {
    const stakeHolders = await StakeHolders.findById(req.params.id);
    if (!stakeHolders) {
      res.status(404).json({ message: "StakeHolders not found" });
      return;
    }
    // Update fields
    Object.assign(stakeHolders, req.body);
    const updatedStakeHolders = await stakeHolders.save();
    res.json(updatedStakeHolders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete version history
export const deleteStakeHolders = async (req, res) => {
  try {
    const stakeHolders = await StakeHolders.findById(req.params.id);
    if (!stakeHolders) {
      return res.status(404).json({ message: "StakeHolders not found" });
    }
    await StakeHolders.deleteOne({ _id: req.params.id });
    return res.json({ message: "StakeHolders History" });
  } catch (err) {
    console.error("Error deleting StakeHolders:", err);
    return res.status(500).json({ message: "Failed to delete StakeHolders" });
  }
};

export default{
    getAllStakeHolders,
    getStakeHoldersById,
    createStakeHolders,
    updateStakeHolders,
    deleteStakeHolders
}