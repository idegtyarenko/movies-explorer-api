import { celebrate, Joi } from 'celebrate';

import { userValidationSettings as settings } from '../utils/constants.js';

const email = Joi.string().email().required().max(settings.EMAIL_MAX);
const password = Joi.string().required().min(settings.PASSWORD_MIN).max(settings.PASSWORD_MAX);
const name = Joi.string().required().min(settings.NAME_MIN).max(settings.NAME_MAX);

const validator = celebrate({
  body: Joi.object().keys({ email, password, name }),
});

export default validator;
