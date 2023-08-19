import supertest from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import app from '../app.js';
import { DATABASE_URL } from '../utils/config.js';
import { DEFAULT_USER, credentials, errorUsers } from '../fixtures/users.js';
import User from '../models/user.js';
import { statusCodes } from '../utils/constants.js';
import { errorMessages } from '../utils/strings.js';

const request = supertest(app);

const AUTH_COOKIE_REGEX = /^jwt=.+; Max-Age=604800; Path=.+; Expires=.+; HttpOnly; SameSite=Strict/;

beforeAll(() => mongoose.connect(DATABASE_URL));
afterAll(() => mongoose.disconnect());

describe('Sign up', () => {
  beforeEach(() => User.findOneAndDelete({ email: DEFAULT_USER.email }));

  it('Returns correct status and a cookie with jwt and saves user with hashed password', async () => {
    const res = await request.post('/signup').send(DEFAULT_USER);
    expect(res.status).toBe(statusCodes.CREATED);
    expect(res.headers['set-cookie'][0]).toMatch(AUTH_COOKIE_REGEX);
    const user = await User.findOne({ email: DEFAULT_USER.email }).select('+password');
    expect(user).toBeDefined();
    expect(bcrypt.compare(user.password, DEFAULT_USER.password)).toBeTruthy();
  });

  it('Does not allow to sign up with the same email twice', async () => {
    await request.post('/signup').send(DEFAULT_USER);
    const res = await request.post('/signup').send(DEFAULT_USER);
    expect(res.status).toBe(statusCodes.CONFLICT);
    expect(res.body.message).toBe(errorMessages.CONFLICTING_EMAIL);
  });

  it('Escapes special characters when saving name', async () => {
    const res = await request.post('/signup').send(errorUsers.SPECIAL_CHARACTERS);
    expect(res.status).toBe(statusCodes.CREATED);
    expect(res.headers['set-cookie'][0]).toMatch(AUTH_COOKIE_REGEX);
    const user = await User.findOne({ email: DEFAULT_USER.email });
    expect(user.name).toBe('&quot;\\&lt;&gt;&amp;');
  });
});

describe('Sign up validation errors', () => {
  it('Does not allow empty email', async () => {
    const res = await request.post('/signup').send(errorUsers.EMPTY_EMAIL);
    expect(res.status).toBe(statusCodes.BAD_REQUEST);
    expect(res.body.message).toBe(errorMessages.VALIDATION_ERROR);
  });

  it('Does not allow invalid email', async () => {
    const res = await request.post('/signup').send(errorUsers.INVALID_EMAIL);
    expect(res.status).toBe(statusCodes.BAD_REQUEST);
    expect(res.body.message).toBe(errorMessages.VALIDATION_ERROR);
  });

  it('Does not allow too long email', async () => {
    const res = await request.post('/signup').send(errorUsers.LONG_EMAIL);
    expect(res.status).toBe(statusCodes.BAD_REQUEST);
    expect(res.body.message).toBe(errorMessages.VALIDATION_ERROR);
  });

  it('Does not allow empty name', async () => {
    const res = await request.post('/signup').send(errorUsers.EMPTY_NAME);
    expect(res.status).toBe(statusCodes.BAD_REQUEST);
    expect(res.body.message).toBe(errorMessages.VALIDATION_ERROR);
  });

  it('Does not allow too short name', async () => {
    const res = await request.post('/signup').send(errorUsers.SHORT_NAME);
    expect(res.status).toBe(statusCodes.BAD_REQUEST);
    expect(res.body.message).toBe(errorMessages.VALIDATION_ERROR);
  });

  it('Does not allow too long name', async () => {
    const res = await request.post('/signup').send(errorUsers.LONG_NAME);
    expect(res.status).toBe(statusCodes.BAD_REQUEST);
    expect(res.body.message).toBe(errorMessages.VALIDATION_ERROR);
  });

  it('Does not allow empty password', async () => {
    const res = await request.post('/signup').send(errorUsers.EMPTY_PASSWORD);
    expect(res.status).toBe(statusCodes.BAD_REQUEST);
    expect(res.body.message).toBe(errorMessages.VALIDATION_ERROR);
  });

  it('Does not allow too short password', async () => {
    const res = await request.post('/signup').send(errorUsers.SHORT_PASSWORD);
    expect(res.status).toBe(statusCodes.BAD_REQUEST);
    expect(res.body.message).toBe(errorMessages.VALIDATION_ERROR);
  });

  it('Does not allow too long password', async () => {
    const res = await request.post('/signup').send(errorUsers.LONG_PASSWORD);
    expect(res.status).toBe(statusCodes.BAD_REQUEST);
    expect(res.body.message).toBe(errorMessages.VALIDATION_ERROR);
  });
});

describe('Sign in', () => {
  beforeAll(() => request.post('/signup').send(DEFAULT_USER));

  it('Returns correct status and a cookie with jwt', async () => {
    const res = await request.post('/signin').send(credentials.CORRECT);
    expect(res.status).toBe(statusCodes.OK);
    expect(res.headers['set-cookie'][0]).toMatch(AUTH_COOKIE_REGEX);
  });

  it('Respond correctly to incorrect email', async () => {
    const res = await request.post('/signin').send(credentials.WRONG_EMAIL);
    expect(res.status).toBe(statusCodes.UNAUTHORIZED);
    expect(res.body.message).toBe(errorMessages.INVALID_CREDENTIALS);
    expect(res.headers['set-cookie']).toBeUndefined();
  });

  it('Respond correctly to incorrect password', async () => {
    const res = await request.post('/signin').send(credentials.WRONG_PASSWORD);
    expect(res.status).toBe(statusCodes.UNAUTHORIZED);
    expect(res.body.message).toBe(errorMessages.INVALID_CREDENTIALS);
    expect(res.headers['set-cookie']).toBeUndefined();
  });
});

describe('Sign out', () => {
  beforeAll(() => request.post('/signup').send(DEFAULT_USER));

  it('Sends cookie with empty jwt', async () => {
    const res = await request.post('/signout');
    expect(res.status).toBe(statusCodes.OK);
    expect(res.headers['set-cookie'][0]).toBe('jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
  });
});
