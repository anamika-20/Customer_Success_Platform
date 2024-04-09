import express from "express";
import { addPhase } from "../controllers/phaseController.js";
import checkRole from "../middlewares/checkRole.js";

const router = express.Router();

router.post(
  "/:proj/add",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  addPhase
);

export default router;
