import express from "express";
import AuditHistoryController from "../controllers/auditHistory.js";
import authenticateToken from "../middlewares/authenticateToken.js";

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
router.get("/auditHistory", getAllAuditHistory);
router.get("/auditHistory/:id", getAuditHistoryById);
router.post("/auditHistory", createAuditHistory);
router.patch("/auditHistory/:id", updateAuditHistory);
router.delete("/auditHistory/:id", deleteAuditHistory);
export default router;
