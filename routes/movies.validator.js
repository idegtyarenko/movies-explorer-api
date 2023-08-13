import { celebrate, Joi } from 'celebrate';

import { movieValidationSettings as settings } from '../utils/constants.js';

const shortString = Joi.string().min(settings.STRING_MIN).max(settings.SHORT_STRING_MAX);
const longString = Joi.string().min(settings.STRING_MIN).max(settings.LONG_STRING_MAX);
const url = Joi.string().uri({ scheme: ['http', 'https'] });
const positiveInteger = Joi.number().min(1).integer();
const country = shortString.pattern(settings.COUNTRY_PATTERN);
const year = Joi.string().min(4).max(4);

const allMovieFields = celebrate({
  body: Joi.object({
    country,
    director: shortString,
    duration: positiveInteger,
    year,
    description: longString,
    image: url,
    trailerLink: url,
    thumbnail: url,
    movieId: positiveInteger,
    nameRU: longString,
    nameEN: longString,
  }),
});

export default allMovieFields;
