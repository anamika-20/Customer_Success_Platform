import express from "express";
import TechnicalEscalationMatrixController from "../controllers/technicalEscalationMatrix.js";

const router = express.Router();

// Destructure the controller functions
const {getAllTechnicalEscalationMatrix,getTechnicalEscalationMatrixById,createTechnicalEscalationMatrix,updateTechnicalEscalationMatrix,deleteTechnicalEscalationMatrix, } = TechnicalEscalationMatrixController;

// Routes
router.get("/technicalEscalationMatrix", getAllTechnicalEscalationMatrix);
router.get("/technicalEscalationMatrix/:id", getTechnicalEscalationMatrixById);
router.post("/technicalEscalationMatrix", createTechnicalEscalationMatrix);
router.patch("/technicalEscalationMatrix/:id", updateTechnicalEscalationMatrix);
router.delete("/technicalEscalationMatrix/:id", deleteTechnicalEscalationMatrix);

export default router;
