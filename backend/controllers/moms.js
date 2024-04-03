import Moms from "../modals/Mom.js";

// Get all Moms
export const getAllMoms = async (req, res) => {
  try {
    const moms = await Moms.find();
    res.json(moms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single Moms
export const getMomsById = async (req, res) => {
  try {
    const mom = await Moms.findById(req.params.id);
    if (!mom) {
      res.status(404).json({ message: "Moms not found" });
      return;
    }
    res.json(mom);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new Moms
export const createMoms = async (req, res) => {
  const mom = new Moms(req.body);
  try {
    const newmom = await mom.save();
    res.status(201).json(newmom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateMoms = async (req, res) => {
  try {
    const mom = await Moms.findById(req.params.id);
    if (!mom) {
      res.status(404).json({ message: "Moms not found" });
      return;
    }
    if (req.body.date != null) {
      mom.date = req.body.date;
    }
    if (req.body.duration != null) {
      mom.duration = req.body.duration;
    }
    if (req.body.momLink != null) {
      mom.momLink = req.body.momLink;
    }
    if (req.body.comments != null) {
      mom.comments = req.body.comments;
    }
    const updatedmom = await mom.save();
    res.json(updatedmom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//delete
export const deleteMoms = async (req, res) => {
  try {
    const mom = await Moms.findById(req.params.id);
    if (!mom) {
      return res.status(404).json({ message: "Moms not found" });
    }

    await Moms.deleteOne({ _id: req.params.id });

    return res.json({ message: "Deleted Moms" });
  } catch (err) {
    console.error("Error deleting Moms:", err);
    return res.status(500).json({ message: "Failed to delete Moms" });
  }
};

export default {
  getAllMoms,
  getMomsById,
  createMoms,
  updateMoms,
  deleteMoms,
};
