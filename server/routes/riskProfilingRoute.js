import express from "express";
import checkRole from "../middlewares/checkRole.js";
import {
  addRiskProfiling,
  editRiskProfiling,
  deleteRiskProfiling,
} from "../controllers/riskProfilingController.js";

const router = express.Router();

router.post(
  "/:proj/add",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  addRiskProfiling
);
router.put(
  "/:proj/:id/edit",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  editRiskProfiling
);
router.delete(
  "/:proj/:id/delete",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  deleteRiskProfiling
);

export default router;
