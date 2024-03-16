import express from "express";
import PhaseController from "../controllers/phases.js";

const router = express.Router();

// Destructure the controller functions
const {getAllPhases,getPhasesById,createPhases,updatePhases,deletePhases} = PhaseController;

// Routes
router.get("/phases", getAllPhases);
router.get("/phases/:id", getPhasesById);
router.post("/phases", createPhases);
router.patch("/phases/:id", updatePhases);
router.delete("/phases/:id", deletePhases);

export default router;
