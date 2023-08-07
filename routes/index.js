import express from 'express';

import { signup, signin, signout } from '../controllers/users.js';
import { signupValidator, signinValidator } from './index.validators.js';
import NotFoundError from '../errors/NotFoundError.js';

const router = express.Router();
router.post('/signup', signupValidator, signup);
router.post('/signin', signinValidator, signin);
router.post('/signout', signout);
router.all('*', (req, res, next) => {
  next(new NotFoundError());
});

export default router;
