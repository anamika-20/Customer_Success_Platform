import express from 'express';
import projectBudgetController from '../controllers/projectBudget.js';

const router = express.Router();

const {getAllProjectBudget,getProjectBudgetById,createProjectBudget,updateProjectBudget, deleteProjectBudget} =
  projectBudgetController;


router.get('/projectBudget', getAllProjectBudget);
router.get('/projectBudget/:id', getProjectBudgetById);
router.post('/projectBudget', createProjectBudget);
router.patch('/projectBudget/:id', updateProjectBudget);
router.delete('/projectBudget/:id', deleteProjectBudget);

export default router;
