import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { addAuditHistory } from "../controllers/auditHistoryController.js";

const router = express.Router();

router.post(
  "/:proj/add",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "auditor"]);
  },
  addAuditHistory
);

export default router;
