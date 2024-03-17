import express from "express";
import projectController from "../controllers/project.js";

const router = express.Router();

const {
  createProject,
  getAllProjects,
  deleteProject,
  updateProject,
  getProjectById,
  getProjectByUserEmail,
} = projectController;

router.get("/project", getAllProjects);
router.get("/project/useremail/:mail", getProjectByUserEmail);
router.get("/project/:id", getProjectById);
router.post("/project", createProject);
router.patch("/project/:id", updateProject);
router.delete("/project/:id", deleteProject);

export default router;
