import express from "express";
import TechnicalEscalationMatrixController from "../controllers/technicalEscalationMatrix.js";

const router = express.Router();

// Destructure the controller functions
const {getAllTechnicalEscalationMatrix,getTechnicalEscalationMatrixById,createTechnicalEscalationMatrix,updateTechnicalEscalationMatrix,deleteTechnicalEscalationMatrix, } = TechnicalEscalationMatrixController;

// Routes
router.get("/technicals", getAllTechnicalEscalationMatrix);
router.get("/technicals/:id", getTechnicalEscalationMatrixById);
router.post("/technicals", createTechnicalEscalationMatrix);
router.patch("/technicals/:id", updateTechnicalEscalationMatrix);
router.delete("/technicals/:id", deleteTechnicalEscalationMatrix);

export default router;
