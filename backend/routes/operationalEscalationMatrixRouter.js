import express from "express";
import OperationalEscalationMatrixController from "../controllers/operationalEscalationMatrix.js";

const router = express.Router();

const {getAllOperationalEscalationMatrix,getOperationalEscalationMatrixById,createOperationalEscalationMatrix,updateOperationalEscalationMatrix,deleteOperationalEscalationMatrix, } = OperationalEscalationMatrixController;

// Routes
router.get("/operationalEscalationMatrix", getAllOperationalEscalationMatrix);
router.get("/operationalEscalationMatrix/:id", getOperationalEscalationMatrixById);
router.post("/operationalEscalationMatrix", createOperationalEscalationMatrix);
router.patch("/operationalEscalationMatrix/:id", updateOperationalEscalationMatrix);
router.delete("/operationalEscalationMatrix/:id", deleteOperationalEscalationMatrix);

export default router;
