import express from 'express';
import RiskProfilingController from '../controllers/riskProfiling.js';

const router = express.Router();
const { getAllRiskProfilings, getRiskProfilingById, createRiskProfiling, updateRiskProfiling, deleteRiskProfiling } = RiskProfilingController

router.get('/riskProfiling', getAllRiskProfilings);
router.get('/riskProfiling/:id', getRiskProfilingById);
router.post('/riskProfiling', createRiskProfiling);
router.patch('/riskProfiling/:id', updateRiskProfiling);
router.delete('/riskProfiling/:id', deleteRiskProfiling);

export default router;
