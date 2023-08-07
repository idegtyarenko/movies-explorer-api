import { statusCodes } from '../utils/constants.js';
import { errorMessages } from '../utils/strings.js';

export default class InvalidCredentialsError extends Error {
  constructor() {
    super(errorMessages.INVALID_CREDENTIALS);
    this.statusCode = statusCodes.UNAUTHORIZED;
  }
}
