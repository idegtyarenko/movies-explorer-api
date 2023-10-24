import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Error as MongooseError } from 'mongoose';

import {
  statusCodes,
  HASH_SALT_LENGTH,
  MONGOOSE_CONFLICT_ERROR_CODE,
  JWT_SETTINGS,
  JWT_COOKIE_MAX_AGE,
} from '../utils/constants.js';
import { successMessages } from '../utils/strings.js';
import { JWT_KEY } from '../utils/config.js';
import User from '../models/user.js';
import ValidationError from '../errors/ValidationError.js';
import ConflictingEmailError from '../errors/ConflictingEmailError.js';
import NotFoundError from '../errors/NotFoundError.js';
import InvalidIdError from '../errors/InvalidIdError.js';
import unescapeObjectFields from '../utils/utils.js';

async function prepareData(data) {
  const hash = data.password ? await bcrypt.hash(data.password, HASH_SALT_LENGTH) : undefined;
  return {
    ...data,
    password: hash,
  };
}

function setAuthCookie(user, res) {
  const tokenPayload = { _id: user._id };
  const token = jwt.sign(tokenPayload, JWT_KEY, JWT_SETTINGS);
  const cookieSettings = {
    maxAge: JWT_COOKIE_MAX_AGE,
    httpOnly: true,
    sameSite: true,
  };
  res.cookie('jwt', token, cookieSettings);
}

export async function signup(req, res, next) {
  try {
    const userData = await prepareData(req.body);
    const user = await User.create(userData);
    setAuthCookie(user, res);
    res.status(statusCodes.CREATED);
    res.send({ message: successMessages.SIGNUP });
  } catch (err) {
    if (err instanceof MongooseError.ValidationError) {
      next(new ValidationError());
    } else if (err.code === MONGOOSE_CONFLICT_ERROR_CODE) {
      next(new ConflictingEmailError());
    } else {
      next(err);
    }
  }
}

export async function signin(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    setAuthCookie(user, res);
    res.send({ message: successMessages.SIGNIN });
  } catch (err) {
    next(err);
  }
}

export function signout(req, res, next) {
  try {
    res.clearCookie('jwt', {
      sameSite: true,
      secure: true,
    }).send({ message: successMessages.SIGNOUT });
  } catch (err) {
    next(err);
  }
}

export async function getCurrentUser(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    if (user === null) {
      throw new NotFoundError();
    } else {
      const unescapedUser = unescapeObjectFields(user.toObject());
      res.send(unescapedUser);
    }
  } catch (err) {
    if (err instanceof MongooseError.CastError) {
      next(new InvalidIdError());
    } else {
      next(err);
    }
  }
}

export async function updateCurrentUser(req, res, next) {
  try {
    const id = req.user._id;
    const data = await prepareData(req.body);
    const settings = { new: true, runValidators: true };
    const user = await User.findByIdAndUpdate(id, data, settings);
    if (user === null) {
      throw new NotFoundError();
    } else {
      res.send(user);
    }
  } catch (err) {
    if (err instanceof MongooseError.CastError) {
      next(new InvalidIdError());
    } else if (err instanceof MongooseError.ValidationError) {
      next(new ValidationError());
    } else if (err.code === MONGOOSE_CONFLICT_ERROR_CODE) {
      next(new ConflictingEmailError());
    } else {
      next(err);
    }
  }
}
