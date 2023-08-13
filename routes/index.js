import express from 'express';

import { signup, signin, signout } from '../controllers/users.js';
import { allUserFields } from '../validators/user.js';
import auth from '../middlewares/auth.js';
import users from './users.js';
import movies from './movies.js';
import NotFoundError from '../errors/NotFoundError.js';

const router = express.Router();
router.post('/signup', allUserFields, signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.use('/users', auth, users);
router.use('/movies', auth, movies);
router.all('*', (req, res, next) => {
  next(new NotFoundError());
});

export default router;
