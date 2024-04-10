import express from "express";
import checkRole from "../middlewares/checkRole.js";
import {
  addProjectUpdate,
  editProjectUpdate,
  deleteProjectUpdate,
} from "../controllers/projectUpdatesController.js";

const router = express.Router();

router.post(
  "/:proj/add",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  addProjectUpdate
);
router.put(
  "/:proj/:id/edit",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  editProjectUpdate
);
router.delete(
  "/:proj/:id/delete",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  deleteProjectUpdate
);

export default router;
