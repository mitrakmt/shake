import express from 'express';
import { isActiveUser } from '../middlewares/isActiveUser.js';
import { logInteraction, fetchInteractions } from '../controllers/analyticsController.js';

const router = express.Router();

router.post('/', isActiveUser, logInteraction);
router.get('/:cardId', isActiveUser, fetchInteractions);

export default router;