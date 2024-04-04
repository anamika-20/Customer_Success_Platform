import express from "express";
import OperationalEscalationMatrixController from "../controllers/operationalEscalationMatrix.js";

const router = express.Router();

const {getAllOperationalEscalationMatrix,getOperationalEscalationMatrixById,createOperationalEscalationMatrix,updateOperationalEscalationMatrix,deleteOperationalEscalationMatrix, } = OperationalEscalationMatrixController;

// Routes
router.get("/operationals", getAllOperationalEscalationMatrix);
router.get("/operationals/:id", getOperationalEscalationMatrixById);
router.post("/operationals", createOperationalEscalationMatrix);
router.patch("/operationals/:id", updateOperationalEscalationMatrix);
router.delete("/operationals/:id", deleteOperationalEscalationMatrix);

export default router;
