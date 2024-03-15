import express from 'express';
import TechStackController from  '../controllers/techStack.js';

const router = express.Router();

const  { getAllTechStack, getTechStackById, createTechStack,updateTechStack, deleteTechStack } = TechStackController;

router.get('/techStack', getAllTechStack);
router.get('/techStack/:id', getTechStackById);
router.post('/techStack', createTechStack);
router.patch('/techStack/:id', updateTechStack);
router.delete('/techStack/:id', deleteTechStack);

export default router;
