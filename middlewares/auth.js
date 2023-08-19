import jwt from 'jsonwebtoken';

import UnauthorizedError from '../errors/UnauthorizedError.js';
import { JWT_KEY } from '../utils/config.js';

export default function auth(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError());
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    next(new UnauthorizedError());
  }

  req.user = payload;
  next();
}
