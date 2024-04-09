import express from "express";
import {
  addProject,
  deleteProject,
  getProject,
  getAllProjects,
  editProject,
} from "../controllers/projectController.js";
import checkRole from "../middlewares/checkRole.js";

const router = express.Router();

router.post(
  "/add",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  addProject
);
router.put(
  "/edit/:id",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  editProject
);
router.delete(
  "/delete/:id",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  deleteProject
);
router.get("/:id", getProject);
router.get("/", getAllProjects);

export default router;
