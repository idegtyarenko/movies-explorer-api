import { statusCodes } from '../utils/constants.js';
import { errorMessages } from '../utils/strings.js';

export default class NotFoundError extends Error {
  constructor() {
    super(errorMessages.NOT_FOUND);
    this.statusCode = statusCodes.NOT_FOUND;
  }
}
