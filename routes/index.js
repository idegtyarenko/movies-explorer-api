import express from 'express';

import { signup, signin, signout } from '../controllers/users.js';
import userValidator from './user.validator.js';
import auth from '../middlewares/auth.js';
import users from './users.js';
import NotFoundError from '../errors/NotFoundError.js';

const router = express.Router();
router.post('/signup', userValidator, signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.use('/users', auth, users);
router.all('*', (req, res, next) => {
  next(new NotFoundError());
});

export default router;
