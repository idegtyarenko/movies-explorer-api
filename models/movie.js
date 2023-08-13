import mongoose from 'mongoose';
import validator from 'validator';

import SchemaWithEscapedFields from './SchemaWithEscapedFields.js';
import { movieValidationSettings as settings } from '../utils/constants.js';

const shortString = {
  type: String,
  required: true,
  minlength: settings.STRING_MIN,
  maxlength: settings.SHORT_STRING_MAX,
};

const longString = {
  ...shortString,
  maxlength: settings.LONG_STRING_MAX,
};

const url = {
  ...longString,
  validate: (v) => validator.isURL(v, { require_protocol: true }),
};

const positiveInteger = {
  type: Number,
  required: true,
  min: 1,
};

const country = {
  ...shortString,
  validate: (v) => v.match(settings.COUNTRY_PATTERN),
};

const year = {
  type: String,
  required: true,
  validate: (v) => parseInt(v, 10) >= 1895 && parseInt(v, 10) <= new Date().getFullYear(),
};

const externalLink = (modelName) => ({
  type: mongoose.Schema.Types.ObjectId,
  ref: modelName,
  required: true,
});

const movieSchema = new SchemaWithEscapedFields({
  country,
  director: shortString,
  duration: positiveInteger, // In minutes
  year,
  description: longString,
  image: url,
  trailerLink: url,
  thumbnail: url,
  owner: externalLink('user'),
  movieId: positiveInteger,
  nameRU: longString,
  nameEN: longString,
}, ['director', 'description', 'nameRU', 'nameEN']);

movieSchema.index({ owner: 1, movieId: 1 }, { unique: true });

export default mongoose.model('movie', movieSchema);
