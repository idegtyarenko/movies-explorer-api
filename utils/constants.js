import errorMessages from './strings.js';

export const RATE_LIMITER_MAX_REQUESTS = 1000;
export const RATE_LIMITER_WINDOW = 15 * 60 * 1000; // 15 minutes

export const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

export const statusCodes = {
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const VALIDATION_ERRORS_SETTINGS = {
  statusCode: statusCodes.BAD_REQUEST,
  message: errorMessages.VALIDATION_ERROR,
};
