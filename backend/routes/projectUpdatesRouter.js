import express from "express";
import ProjectUpdatesController from "../controllers/projectUpdates.js";

const router = express.Router();

// Destructure the controller functions
const {
  getAllProjectUpdates,
  getProjectUpdatesById,
  createProjectUpdates,
  updateProjectUpdates,
  deleteProjectUpdates,
} = ProjectUpdatesController;

// Routes
router.get("/projectupdates", getAllProjectUpdates);
router.get("/projectupdates/:id", getProjectUpdatesById);
router.post("/projectupdates", createProjectUpdates);
router.patch("/projectupdates/:id", updateProjectUpdates);
router.delete("/projectupdates/:id", deleteProjectUpdates);

export default router;
