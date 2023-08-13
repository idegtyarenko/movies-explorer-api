import { celebrate, Joi } from 'celebrate';

import { userValidationSettings as settings } from '../utils/constants.js';

const email = Joi.string().email().max(settings.EMAIL_MAX);
const password = Joi.string().min(settings.PASSWORD_MIN).max(settings.PASSWORD_MAX);
const name = Joi.string().min(settings.NAME_MIN).max(settings.NAME_MAX);

export const anyUserFields = celebrate({
  body: Joi.object().keys({ email, password, name }),
});

export const allUserFields = celebrate({
  body: Joi.object({ email, password, name }),
});
