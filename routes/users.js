import express from 'express';

import { getCurrentUser, updateCurrentUser } from '../controllers/users.js';
import { anyUserFields } from '../validators/user.js';

const router = express.Router();

router.get('/me', getCurrentUser);
router.patch('/me', anyUserFields, updateCurrentUser);

export default router;
