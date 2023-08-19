import { statusCodes } from '../utils/constants.js';
import { errorMessages } from '../utils/strings.js';

export default class ValidationError extends Error {
  constructor() {
    super(errorMessages.VALIDATION_ERROR);
    this.statusCode = statusCodes.BAD_REQUEST;
  }
}
