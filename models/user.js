import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

import SchemaWithEscapedFields from './SchemaWithEscapedFields.js';
import InvalidCredentialsError from '../errors/InvalidCredentialsError.js';
import { validationSettings as settings } from '../utils/constants.js';

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

userSchema.statics.findByCredentials = async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    return Promise.reject(new InvalidCredentialsError());
  }
  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    return Promise.reject(new InvalidCredentialsError());
  }
  return user;
};

export default mongoose.model('user', userSchema);
