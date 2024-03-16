import express from 'express';
import versionHistoryController from '../controllers/versionHistory.js';

const router = express.Router();
const {getAllVersionHistory, getVersionHistoryById, createVersionHistory, updateVersionHistory, deleteVersionHistory  } =
  versionHistoryController;

router.get('/versionHistory', getAllVersionHistory);
router.get('/versionHistory/:id', getVersionHistoryById);
router.post('/versionHistory', createVersionHistory);
router.patch('/versionHistory/:id', updateVersionHistory);
router.delete('/versionHistory/:id', deleteVersionHistory);

export default router;
