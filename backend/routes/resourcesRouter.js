import express from "express";
import ResourcesController from "../controllers/resources.js";

const router = express.Router();

// Destructure the controller functions
const {
  getAllResources,
  getResourcesById,
  createResources,
  updateResources,
  deleteResources,
} = ResourcesController;

// Routes
router.get("/resources", getAllResources);
router.get("/resources/:id", getResourcesById);
router.post("/resources", createResources);
router.patch("/resources/:id", updateResources);
router.delete("/resources/:id", deleteResources);

export default router;
