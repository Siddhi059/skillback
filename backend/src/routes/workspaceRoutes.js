import { Router } from 'express';
import {
  applyToJob,
  bookMentor,
  getJobs,
  getMentors,
  getRoadmap,
  getSkillModules,
  toggleRoadmapTask,
  toggleSaveJob,
  updateSkillModuleProgress,
} from '../controllers/workspaceController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.get('/roadmap', getRoadmap);
router.patch('/roadmap/:id/toggle', toggleRoadmapTask);

router.get('/modules', getSkillModules);
router.patch('/modules/:id/progress', updateSkillModuleProgress);

router.get('/jobs', getJobs);
router.post('/jobs/:id/save', toggleSaveJob);
router.post('/jobs/:id/apply', applyToJob);

router.get('/mentors', getMentors);
router.post('/mentors/:id/book', bookMentor);

export default router;
