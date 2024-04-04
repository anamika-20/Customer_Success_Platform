import express from 'express';
import RiskProfilingController from '../controllers/riskProfiling.js';

const router = express.Router();
const { getAllRiskProfilings, getRiskProfilingById, createRiskProfiling, updateRiskProfiling, deleteRiskProfiling } = RiskProfilingController

router.get('/risks', getAllRiskProfilings);
router.get('/risks/:id', getRiskProfilingById);
router.post('/risks', createRiskProfiling);
router.patch('/risks/:id', updateRiskProfiling);
router.delete('/risks/:id', deleteRiskProfiling);

export default router;
