import { Joi } from 'celebrate';

import { validationSettings as settings } from '../utils/constants.js';

export const shortString = Joi.string().min(settings.STRING_MIN).max(settings.SHORT_STRING_MAX);
export const longString = Joi.string().min(settings.STRING_MIN).max(settings.LONG_STRING_MAX);
export const url = Joi.string().uri({ scheme: ['http', 'https'] });
export const positiveInteger = Joi.number().min(1).integer();
export const country = shortString.pattern(settings.COUNTRY_PATTERN);
export const year = Joi.string().min(4).max(4);
