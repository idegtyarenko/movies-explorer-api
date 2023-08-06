import mongoose from 'mongoose';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { errors as validationErrors } from 'celebrate';

import { DATABASE_URL } from './utils/config.js';
import rateLimiter from './middlewares/rateLimiter.js';
import cors from './middlewares/cors.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import router from './routes/index.js';
import { VALIDATION_ERRORS_SETTINGS } from './utils/constants.js';
import errorHandler from './middlewares/errorHandler.js';

mongoose.connect(DATABASE_URL);

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
app.use(validationErrors(VALIDATION_ERRORS_SETTINGS));
app.use(errorHandler);

export default app;
