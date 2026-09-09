import { Router } from 'express';
import { joinCommunity } from '../controllers/communityController.js';
import { validateBody, communitySchema } from '../middleware/validate.js';

const router = Router();

router.post('/join', validateBody(communitySchema), joinCommunity);

export default router;
