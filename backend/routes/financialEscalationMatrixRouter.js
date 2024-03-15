import express from "express";
import FinancialEscalationMatrixController from "../controllers/financialEscalationMatrix.js";

const router = express.Router();

// Destructure the controller functions
const {getAllFinancialEscalationMatrix,getFinancialEscalationMatrixById,createFinancialEscalationMatrix,updateFinancialEscalationMatrix,deleteFinancialEscalationMatrix, } = FinancialEscalationMatrixController;

// Routes
router.get("/financialEscalationMatrix", getAllFinancialEscalationMatrix);
router.get("/financialEscalationMatrix/:id", getFinancialEscalationMatrixById);
router.post("/financialEscalationMatrix", createFinancialEscalationMatrix);
router.patch("/financialEscalationMatrix/:id", updateFinancialEscalationMatrix);
router.delete("/financialEscalationMatrix/:id", deleteFinancialEscalationMatrix);

export default router;
