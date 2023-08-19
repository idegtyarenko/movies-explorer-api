import { errorMessages } from './strings.js';

export const RATE_LIMITER_MAX_REQUESTS = 1000;
export const RATE_LIMITER_WINDOW = 15 * 60 * 1000; // 15 minutes

export const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

export const HASH_SALT_LENGTH = 10;

export const JWT_SETTINGS = { expiresIn: '7d' };
export const JWT_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 1 week

export const validationSettings = {
  STRING_MIN: 2,
  SHORT_STRING_MAX: 30,
  LONG_STRING_MAX: 2000,
  COUNTRY_PATTERN: /[\p{L}\- ()']*/u, // Supports Côte D'Ivoire
  EMAIL_MAX: 128,
  PASSWORD_MIN: 6,
  PASSWORD_MAX: 30,
  NAME_MIN: 2,
  NAME_MAX: 30,
};

export const statusCodes = {
  OK: 200,
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
export const MONGO_ID_LENGTH = 24;
