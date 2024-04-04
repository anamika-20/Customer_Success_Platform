import express from 'express';
import versionHistoryController from '../controllers/versionHistory.js';

const router = express.Router();
const {getAllVersionHistory, getVersionHistoryById, createVersionHistory, updateVersionHistory, deleteVersionHistory  } =
  versionHistoryController;

router.get('/versions', getAllVersionHistory);
router.get('/versions/:id', getVersionHistoryById);
router.post('/versions', createVersionHistory);
router.patch('/versions/:id', updateVersionHistory);
router.delete('/versions/:id', deleteVersionHistory);

export default router;
