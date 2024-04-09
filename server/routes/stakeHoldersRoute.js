import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { updateStakeholders } from "../controllers/stakeHoldersController.js";

const router = express.Router();
router.put(
  "/:proj/edit",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  updateStakeholders
);

export default router;
