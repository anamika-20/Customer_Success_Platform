import Resources from "../schemas/Resources.js";

// Get all resources
export const getAllResources = async (req, res) => {
  try {
    const resources = await Resources.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single resources
export const getResourcesById = async (req, res) => {
  try {
    const resource = await Resources.findById(req.params.id);
    if (!resource) {
      res.status(404).json({ message: "resources not found" });
      return;
    }
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new resources
export const createResources = async (req, res) => {
  const resource = new Resources(req.body);
  try {
    const newresource = await resource.save();
    res.status(201).json(newresource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateResources = async (req, res) => {
  try {
    const resource = await Resources.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Update resource fields if provided in request body
    if (req.body.resourceName != null) {
      resource.resourceName = req.body.resourceName;
    }
    if (req.body.role != null) {
      resource.role = req.body.role;
    }
    if (req.body.startDate != null) {
      resource.startDate = req.body.startDate;
    }
    if (req.body.endDate != null) {
      resource.endDate = req.body.endDate;
    }
    if (req.body.comment != null) {
      resource.comment = req.body.comment;
    }

    // Save the updated resource
    const updatedResource = await resource.save();
    res.json(updatedResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//delete
export const deleteResources = async (req, res) => {
  try {
    const resource = await Resources.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "resources not found" });
    }

    await Resources.deleteOne({ _id: req.params.id });

    return res.json({ message: "Deleted resources" });
  } catch (err) {
    console.error("Error deleting resources:", err);
    return res.status(500).json({ message: "Failed to delete resources" });
  }
};

export default {
  getAllResources,
  getResourcesById,
  createResources,
  updateResources,
  deleteResources,
};
