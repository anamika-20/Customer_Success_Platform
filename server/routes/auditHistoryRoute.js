import express from "express";
import checkRole from "../middlewares/checkRole.js";
import {
  deleteAuditHistory,
  addAuditHistory,
  editAuditHistory,
} from "../controllers/auditHistoryController.js";

const router = express.Router();

router.post(
  "/:proj/add",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "auditor"]);
  },
  addAuditHistory
);
router.put(
  "/:proj/:id/edit",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "auditor"]);
  },
  editAuditHistory
);
router.delete(
  "/:proj/:id/delete",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "auditor"]);
  },
  deleteAuditHistory
);

export default router;
