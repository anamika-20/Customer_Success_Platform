import express from "express";
import checkRole from "../middlewares/checkRole.js";
import {
  addResource,
  editResource,
  deleteResource,
} from "../controllers/resourcesController.js";

const router = express.Router();

router.post(
  "/:proj/add",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  addResource
);
router.put(
  "/:proj/:id/edit",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  editResource
);
router.delete(
  "/:proj/:id/delete",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  deleteResource
);

export default router;
