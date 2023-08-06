import { statusCodes } from '../utils/constants.js';
import errorMessages from '../utils/strings.js';

export default function errorHandler(err, req, res, next) {
  const { statusCode = statusCodes.INTERNAL_SERVER_ERROR, message } = err;
  const isUnknownError = statusCode === statusCodes.INTERNAL_SERVER_ERROR;
  res
    .status(statusCode)
    .send({ message: isUnknownError ? errorMessages.INTERNAL_SERVER_ERROR : message });
  next();
}
