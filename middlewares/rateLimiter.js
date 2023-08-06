import rateLimit from 'express-rate-limit';

import { RATE_LIMITER_MAX_REQUESTS, RATE_LIMITER_WINDOW } from '../utils/constants.js';

const settings = {
  max: RATE_LIMITER_MAX_REQUESTS,
  windowMs: RATE_LIMITER_WINDOW,
  standardHeaders: true,
  legacyHeaders: false,
};

const rateLimiter = rateLimit(settings);

export default rateLimiter;
