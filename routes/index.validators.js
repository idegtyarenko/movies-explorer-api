import { celebrate, Joi } from 'celebrate';

import { userValidationSettings as settings } from '../utils/constants.js';

const credentialsFieldsSchema = {
  email: Joi.string().email().required().max(settings.EMAIL_MAX),
  password: Joi.string().required().min(settings.PASSWORD_MIN).max(settings.PASSWORD_MAX),
};

const profileFieldsSchema = {
  name: Joi.string().required().min(settings.NAME_MIN).max(settings.NAME_MAX),
};

export const signupValidator = celebrate({
  body: Joi.object().keys({
    ...credentialsFieldsSchema,
    ...profileFieldsSchema,
  }),
});

export const signinValidator = celebrate({
  body: Joi.object().keys(profileFieldsSchema),
});
