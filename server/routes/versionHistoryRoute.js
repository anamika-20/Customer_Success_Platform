import express from "express";
import {
  addVersionHistory,
  editVersionHistory,
  deleteVersionHistory,
} from "../controllers/versionHistoryController.js";
import checkRole from "../middlewares/checkRole.js";

const router = express.Router();

router.post(
  "/:proj/add",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  addVersionHistory
);
router.put(
  "/:proj/:id/edit",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  editVersionHistory
);
router.delete(
  "/:proj/:id/delete",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  deleteVersionHistory
);

export default router;
