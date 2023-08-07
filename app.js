import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { errors as validationErrors } from 'celebrate';

import rateLimiter from './middlewares/rateLimiter.js';
import cors from './middlewares/cors.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import router from './routes/index.js';
import { CELEBRATE_VALIDATION_ERRORS_SETTINGS } from './utils/constants.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.use(rateLimiter);
app.use(helmet());
app.use(cors);
app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', router);
app.use(errorLogger);
app.use(validationErrors(CELEBRATE_VALIDATION_ERRORS_SETTINGS));
app.use(errorHandler);

export default app;
