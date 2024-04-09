import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { addRiskProfiling } from "../controllers/riskProfilingController.js";

const router = express.Router();

router.post(
  "/:proj/add",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  addRiskProfiling
);

export default router;
