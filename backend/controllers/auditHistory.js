import AuditHistory from "../Schemas/AuditHistory.js";

// Get all Audit History
export const getAllAuditHistory = async (req, res) => {
  try {
    const auditHistory = await AuditHistory.find();
    res.json(auditHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single Audit History by ID
export const getAuditHistoryById = async (req, res) => {
  try {
    const auditHistory = await AuditHistory.findById(req.params.id);
    if (!auditHistory) {
      res.status(404).json({ message: "Audit History not found" });
      return;
    }
    res.json(auditHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new Audit History
export const createAuditHistory = async (req, res) => {
  const auditHistory = new AuditHistory(req.body);
  try {
    const newAuditHistory = await auditHistory.save();
    res.status(201).json(newAuditHistory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Audit History
// export const updateAuditHistory = async (req, res) => {
//   try {
//     const auditHistory = await AuditHistory.findById(req.params.id);
//     if (!auditHistory) {
//       res.status(404).json({ message: "Audit History not found" });
//       return;
//     }
//     // Update fields
//     Object.assign(auditHistory, req.body);
//     const updatedAuditHistory = await auditHistory.save();
//     res.json(updatedAuditHistory);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

export const updateAuditHistory = async (req, res) => {
  try {
    const auditHistory = await AuditHistory.findById(req.params.id);
    if (!auditHistory) {
      return res.status(404).json({ message: "Audit History not found" });
    }

    // Update fields if present in the request body
    if (req.body.date !== undefined) {
      auditHistory.date = req.body.date;
    }
    if (req.body.reviewedBy !== undefined) {
      auditHistory.reviewedBy = req.body.reviewedBy;
    }
    if (req.body.status !== undefined) {
      auditHistory.status = req.body.status;
    }
    if (req.body.reviewedSection !== undefined) {
      auditHistory.reviewedSection = req.body.reviewedSection;
    }
    if (req.body.comments !== undefined) {
      auditHistory.comments = req.body.comments;
    }
    if (req.body.actionItem !== undefined) {
      auditHistory.actionItem = req.body.actionItem;
    }

    const updatedAuditHistory = await auditHistory.save();
    res.json(updatedAuditHistory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Delete Audit History
export const deleteAuditHistory = async (req, res) => {
  try {
    const auditHistory = await AuditHistory.findById(req.params.id);
    if (!auditHistory) {
      return res.status(404).json({ message: "Audit History not found" });
    }
    await AuditHistory.deleteOne({ _id: req.params.id });
    return res.json({ message: "Deleted Audit History" });
  } catch (err) {
    console.error("Error deleting Audit History:", err);
    return res.status(500).json({ message: "Failed to delete Audit History" });
  }
};

export default {
  getAllAuditHistory,
  getAuditHistoryById,
  createAuditHistory,
  updateAuditHistory,
  deleteAuditHistory,
};
