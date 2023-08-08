import jwt from 'jsonwebtoken';

import ForbiddenError from '../errors/ForbiddenError.js';
import { JWT_KEY } from '../utils/config.js';

export default function auth(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    next(new ForbiddenError());
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    next(new ForbiddenError());
  }

  req.user = payload;
  next();
}
