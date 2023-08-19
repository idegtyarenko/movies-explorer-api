import { validationSettings as settings } from '../utils/constants.js';

export const DEFAULT_USER = {
  email: 'test.email@testdomain.com',
  password: 'testtesttest',
  name: 'Ewan McBundle Jr.',
};

export const UPDATED_USER = {
  email: 'another.email@testdomain.com',
  password: 'passwordpassword',
  name: 'John McCoughlin Sr.',
};

export const errorUsers = {
  EMPTY_EMAIL: { ...DEFAULT_USER, email: undefined },
  INVALID_EMAIL: { ...DEFAULT_USER, email: 'iamnot@nemail' },
  LONG_EMAIL: { ...DEFAULT_USER, email: `${'a'.repeat(settings.EMAIL_MAX - '@domain.com'.length + 1)}@domain.com` },
  SPECIAL_CHARACTERS: { ...DEFAULT_USER, name: '"\\<>&' },
  EMPTY_NAME: { ...DEFAULT_USER, name: undefined },
  SHORT_NAME: { ...DEFAULT_USER, name: 'a'.repeat(settings.NAME_MIN - 1) },
  LONG_NAME: { ...DEFAULT_USER, name: 'a'.repeat(settings.NAME_MAX + 1) },
  EMPTY_PASSWORD: { ...DEFAULT_USER, password: undefined },
  SHORT_PASSWORD: { ...DEFAULT_USER, password: 'a'.repeat(settings.PASSWORD_MIN - 1) },
  LONG_PASSWORD: { ...DEFAULT_USER, password: 'a'.repeat(settings.PASSWORD_MAX + 1) },
};

export const credentials = {
  CORRECT: {
    email: DEFAULT_USER.email,
    password: DEFAULT_USER.password,
  },
  WRONG_EMAIL: {
    email: 'thisisalongnonexistingemail@domaindomaindomain.com',
    password: DEFAULT_USER.password,
  },
  WRONG_PASSWORD: {
    email: DEFAULT_USER.email,
    password: 'testtesttedt',
  },
};
