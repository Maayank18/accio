import { Router } from 'express';
import { requestEarlyAccess } from '../controllers/earlyAccessController.js';
import { validateBody, earlyAccessSchema } from '../middleware/validate.js';

const router = Router();

router.post('/', validateBody(earlyAccessSchema), requestEarlyAccess);

export default router;
