import express from 'express';
import TechStackController from  '../controllers/techStack.js';

const router = express.Router();

const  { getAllTechStack, getTechStackById, createTechStack,updateTechStack, deleteTechStack } = TechStackController;

router.get('/techstacks', getAllTechStack);
router.get('/techstacks/:id', getTechStackById);
router.post('/techstacks', createTechStack);
router.patch('/techstacks/:id', updateTechStack);
router.delete('/techstacks/:id', deleteTechStack);

export default router;
