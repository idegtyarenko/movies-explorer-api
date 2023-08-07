import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

import SchemaWithEscapedFields from './SchemaWithEscapedFields.js';
import InvalidCredentialsError from '../errors/InvalidCredentialsError.js';
import { userValidationSettings as settings } from '../utils/constants.js';

const userSchema = new SchemaWithEscapedFields({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (v) => validator.isEmail(v),
  },
  password: {
    type: String,
    required: true,
    validate: (v) => /^\$2[aby]?\$\d{1,2}\$[./A-Za-z0-9]{53}$/.test(v),
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: settings.NAME_MIN,
    maxlength: settings.NAME_MAX,
  },
}, ['name']);

userSchema.statics.findByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new InvalidCredentialsError());
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new InvalidCredentialsError());
          }
          return user;
        });
    });
};

export default mongoose.model('user', userSchema);
