import express from "express";
import FinancialEscalationMatrixController from "../controllers/financialEscalationMatrix.js";

const router = express.Router();

// Destructure the controller functions
const {getAllFinancialEscalationMatrix,getFinancialEscalationMatrixById,createFinancialEscalationMatrix,updateFinancialEscalationMatrix,deleteFinancialEscalationMatrix, } = FinancialEscalationMatrixController;

// Routes
router.get("/financials", getAllFinancialEscalationMatrix);
router.get("/financials/:id", getFinancialEscalationMatrixById);
router.post("/financials", createFinancialEscalationMatrix);
router.patch("/financials/:id", updateFinancialEscalationMatrix);
router.delete("/financials/:id", deleteFinancialEscalationMatrix);

export default router;
