import { statusCodes } from '../utils/constants.js';
import { errorMessages } from '../utils/strings.js';

export default class InvalidIdError extends Error {
  constructor() {
    super(errorMessages.INVALID_ID);
    this.statusCode = statusCodes.BAD_REQUEST;
  }
}
