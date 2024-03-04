import express from "express";
import MomsController from "../controllers/moms.js";

const router = express.Router();

// Destructure the controller functions
const { getAllMoms, getMomsById, createMoms, updateMoms, deleteMoms } =
  MomsController;

// Routes
router.get("/moms", getAllMoms);
router.get("/moms/:id", getMomsById);
router.post("/moms", createMoms);
router.patch("/moms/:id", updateMoms);
router.delete("/moms/:id", deleteMoms);

export default router;
