import { errorMessages } from './strings.js';

export const RATE_LIMITER_MAX_REQUESTS = 1000;
export const RATE_LIMITER_WINDOW = 15 * 60 * 1000; // 15 minutes

export const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

export const HASH_SALT_LENGTH = 10;

export const JWT_SETTINGS = { expiresIn: '7d' };
export const JWT_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 1 week

export const statusCodes = {
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const CELEBRATE_VALIDATION_ERRORS_SETTINGS = {
  statusCode: statusCodes.BAD_REQUEST,
  message: errorMessages.VALIDATION_ERROR,
};

export const MONGOOSE_CONFLICT_ERROR_CODE = 11000;
