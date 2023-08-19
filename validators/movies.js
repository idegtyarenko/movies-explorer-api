import { celebrate, Joi } from 'celebrate';

import {
  shortString,
  longString,
  positiveInteger,
  url,
  country,
  year,
} from './index.js';

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
