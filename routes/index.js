import express from 'express';

import NotFoundError from '../errors/NotFoundError.js';

const router = express.Router();
router.all('*', (req, res, next) => {
  next(new NotFoundError());
});

export default router;
