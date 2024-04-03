import SprintDetail from "../modals/SprintDetail.js";

// Get all sprint details
export const getAllSprintDetails = async (req, res) => {
  try {
    const sprintDetails = await SprintDetail.find();
    res.json(sprintDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single sprint detail by ID
export const getSprintDetailById = async (req, res) => {
  try {
    const sprintDetail = await SprintDetail.findById(req.params.id);
    if (!sprintDetail) {
      res.status(404).json({ message: "Sprint Detail not found" });
      return;
    }
    res.json(sprintDetail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new sprint detail
export const createSprintDetail = async (req, res) => {
  const sprintDetail = new SprintDetail(req.body);
  try {
    const newSprintDetail = await sprintDetail.save();
    res.status(201).json(newSprintDetail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update sprint detail
export const updateSprintDetail = async (req, res) => {
  try {
    const sprintDetail = await SprintDetail.findById(req.params.id);
    if (!sprintDetail) {
      res.status(404).json({ message: "Sprint Detail not found" });
      return;
    }
    // Update fields if present in the request body
    Object.assign(sprintDetail, req.body);
    const updatedSprintDetail = await sprintDetail.save();
    res.json(updatedSprintDetail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete sprint detail
export const deleteSprintDetail = async (req, res) => {
  try {
    const sprintDetail = await SprintDetail.findById(req.params.id);
    if (!sprintDetail) {
      return res.status(404).json({ message: "Sprint Detail not found" });
    }
    await SprintDetail.deleteOne({ _id: req.params.id });
    return res.json({ message: "Deleted Sprint Detail" });
  } catch (err) {
    console.error("Error deleting Sprint Detail:", err);
    return res.status(500).json({ message: "Failed to delete Sprint Detail" });
  }
};

export default {
    getAllSprintDetails,
    getSprintDetailById,
    createSprintDetail,
    updateSprintDetail,
    deleteSprintDetail,
}