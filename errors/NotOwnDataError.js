import { statusCodes } from '../utils/constants.js';
import { errorMessages } from '../utils/strings.js';

export default class NotOwnDataError extends Error {
  constructor() {
    super(errorMessages.NOT_OWN_DATA);
    this.statusCode = statusCodes.FORBIDDEN;
  }
}
