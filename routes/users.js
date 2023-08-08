import express from 'express';

import { getCurrentUser, updateCurrentUser } from '../controllers/users.js';
import userValidator from './user.validator.js';

const router = express.Router();

router.get('/me', getCurrentUser);
router.patch('/me', userValidator, updateCurrentUser);

export default router;
