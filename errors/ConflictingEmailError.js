import { statusCodes } from '../utils/constants.js';
import { errorMessages } from '../utils/strings.js';

export default class ConflictingEmailError extends Error {
  constructor() {
    super(errorMessages.CONFLICTING_EMAIL);
    this.statusCode = statusCodes.CONFLICT;
  }
}
