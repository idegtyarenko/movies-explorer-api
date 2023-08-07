import { celebrate, Joi } from 'celebrate';

const credentialsFieldsSchema = {
  email: Joi.string().email().required().max(128),
  password: Joi.string().required().min(6).max(30),
};

const profileFieldsSchema = {
  name: Joi.string().required().min(2).max(30),
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
