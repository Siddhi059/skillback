import { Router } from 'express';
import {
  evaluateInterviewAnswer,
  getAgentHistory,
  translateCareerBreak,
} from '../controllers/agentController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.post('/translate-break', translateCareerBreak);
router.post('/interview-feedback', evaluateInterviewAnswer);
router.get('/history', getAgentHistory);

export default router;
