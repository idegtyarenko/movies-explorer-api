import supertest from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import app from '../app.js';
import { DATABASE_URL } from '../utils/config.js';
import { defaultUser } from '../fixtures/index.js';
import User from '../models/user.js';
import { statusCodes } from '../utils/constants.js';
import { errorMessages } from '../utils/strings.js';

const request = supertest(app);

beforeAll(() => mongoose.connect(DATABASE_URL));

afterAll(() => mongoose.disconnect());

describe('Sign up', () => {
  beforeAll(() => User.findOneAndDelete({ email: defaultUser.email }));

  it('Returns correct status and a cookie with jwt', async () => {
    const res = await request.post('/signup').send(defaultUser);
    expect(res.status).toBe(statusCodes.CREATED);
    expect(res.headers['set-cookie'][0]).toMatch(/^jwt=.+; Max-Age=604800; Path=.+; Expires=.+; HttpOnly; SameSite=Strict/);
  });
  it('Saves user in database with hashed password', async () => {
    const user = await User.findOne({ email: defaultUser.email }).select('+password');
    expect(user).toBeDefined();
    expect(bcrypt.compare(user.password, defaultUser.password)).toBeTruthy();
  });
  it('Does not allow to sign up with the same email twice', async () => {
    const res = await request.post('/signup').send(defaultUser);
    expect(res.status).toBe(statusCodes.CONFLICT);
    expect(res.body.message).toBe(errorMessages.CONFLICTING_EMAIL);
  });
  it.todo('Does not allow invalid email');
  it.todo('Saves name with escaped special characters');
  it.todo('Does not allow name to be too short');
  it.todo('Does not allow name to be too long');
  it.todo('Does not allow any of the fields to be empty');
});

describe('Sign in', () => {});
describe('Sign out', () => {});
