import express from 'express';
import projectBudgetController from '../controllers/projectBudget.js';

const router = express.Router();

const {getAllProjectBudget,getProjectBudgetById,createProjectBudget,updateProjectBudget, deleteProjectBudget} =
  projectBudgetController;


router.get('/budgets', getAllProjectBudget);
router.get('/budgets/:id', getProjectBudgetById);
router.post('/budgets', createProjectBudget);
router.patch('/budgets/:id', updateProjectBudget);
router.delete('/budgets/:id', deleteProjectBudget);

export default router;
