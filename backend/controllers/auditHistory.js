import AuditHistory from "../Schemas/AuditHistory.js";
import Stakeholders from "../Schemas/StakeHolders.js";
import { sendEmail } from "./sendEmail.js";

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
    // res.send(req.body, req.params);
    /*
    // List of fields to check for updates
    const fieldsToUpdate = [
      "date",
      "reviewedBy",
      "status",
      "reviewedSection",
      "comments",
      "actionItem",
    ];

    // Iterate over each field and update 'auditHistory' if present in the request body
    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        auditHistory[field] = req.body[field];
      }
    });
    */
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
    let data = "<table style='border-collapse: collapse;'>";
    data +=
      "<thead><tr style='border: 1px solid black;'><th style='border: 1px solid black;'>Field</th><th style='border: 1px solid black;'>Value</th></tr></thead>";
    data += "<tbody>";
    data += `<tr style='border: 1px solid black;'><td style='border: 1px solid black;'>ID</td><td style='border: 1px solid black;'>${auditHistory._id}</td></tr>`;
    data += `<tr style='border: 1px solid black;'><td style='border: 1px solid black;'>Date</td><td style='border: 1px solid black;'>${auditHistory.date}</td></tr>`;
    data += `<tr style='border: 1px solid black;'><td style='border: 1px solid black;'>Reviwed By</td><td style='border: 1px solid black;'>${auditHistory.reviewedBy}</td></tr>`;
    data += `<tr style='border: 1px solid black;'><td style='border: 1px solid black;'>Status</td><td style='border: 1px solid black;'>${auditHistory.status}</td></tr>`;
    data += `<tr style='border: 1px solid black;'><td style='border: 1px solid black;'>Reviewed Section</td><td style='border: 1px solid black;'>${auditHistory.reviewedSection}</td></tr>`;
    data += `<tr style='border: 1px solid black;'><td style='border: 1px solid black;'>Comments</td><td style='border: 1px solid black;'>${auditHistory.comments}</td></tr>`;
    data += `<tr style='border: 1px solid black;'><td style='border: 1px solid black;'>Action Item</td><td style='border: 1px solid black;'>${auditHistory.actionItem}</td></tr>`;
    data += `<tr style='border: 1px solid black;'><td style='border: 1px solid black;'>Project ID</td><td style='border: 1px solid black;'>${auditHistory.project_id}</td></tr>`;
    data += `<tr style='border: 1px solid black;'><td style='border: 1px solid black;'>Created At</td><td style='border: 1px solid black;'>${auditHistory.createdAt}</td></tr>`;
    data += `<tr style='border: 1px solid black;'><td style='border: 1px solid black;'>Updated At</td><td style='border: 1px solid black;'>${auditHistory.updatedAt}</td></tr>`;
    data += "</tbody>";
    data += "</table>";
    const stakeHolders = await Stakeholders.find({
      project_id: updatedAuditHistory.project_id,
    });
    const emails = stakeHolders.map((stakeHolder) => stakeHolder.contact);
    const names = stakeHolders.map((stakeHolder) => stakeHolder.name);
    console.log(names);
    const result = await sendEmail(emails, data, names);
    console.log(result);
    if (result.success) console.log("Email sent successfully");
    else console.log("Email not sent!");
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
