import express from "express";
import AuditHistoryController from "../controllers/auditHistory.js";

const router = express.Router();

// Destructure the controller functions
const {
  getAllAuditHistory,
  getAuditHistoryById,
  createAuditHistory,
  updateAuditHistory,
  deleteAuditHistory,
} = AuditHistoryController;

// Routes
router.get("/audits", getAllAuditHistory);
router.get("/audits/:id", getAuditHistoryById);
router.post("/audits", createAuditHistory);
router.patch("/audits/:id", updateAuditHistory);
router.delete("/audits/:id", deleteAuditHistory);
export default router;
