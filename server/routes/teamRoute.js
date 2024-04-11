import express from "express";
import {
  addApprovedTeams,
  editApprovedTeams,
  deleteApprovedTeams,
} from "../controllers/approvedTeamsController.js";
import checkRole from "../middlewares/checkRole.js";

const router = express.Router();

router.post(
  "/:proj/add",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  addApprovedTeams
);
router.put(
  "/:proj/:id/edit",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  editApprovedTeams
);
router.delete(
  "/:proj/:id/delete",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  deleteApprovedTeams
);

export default router;
