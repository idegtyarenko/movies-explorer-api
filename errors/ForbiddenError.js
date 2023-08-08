import { statusCodes } from '../utils/constants.js';
import { errorMessages } from '../utils/strings.js';

export default class UnauthorizedError extends Error {
  constructor() {
    super(errorMessages.FORBIDDEN);
    this.statusCode = statusCodes.FORBIDDEN;
  }
}
