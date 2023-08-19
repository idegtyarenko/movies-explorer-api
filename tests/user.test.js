import supertest from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import app from '../app.js';
import { DATABASE_URL } from '../utils/config.js';
import { DEFAULT_USER, UPDATED_USER } from '../fixtures/users.js';
import User from '../models/user.js';
import { statusCodes } from '../utils/constants.js';
import { errorMessages } from '../utils/strings.js';

const request = supertest(app);

beforeAll(() => mongoose.connect(DATABASE_URL));
afterAll(() => mongoose.disconnect());

describe('User path requires authentication', () => {
  it('Get user requires authentication', async () => {
    const res = await request.get('/users/me');
    expect(res.status).toBe(statusCodes.FORBIDDEN);
    expect(res.body.message).toBe(errorMessages.FORBIDDEN);
  });

  it('Update user requires authentication', async () => {
    const res = await request.patch('/users/me').send(DEFAULT_USER);
    expect(res.status).toBe(statusCodes.FORBIDDEN);
    expect(res.body.message).toBe(errorMessages.FORBIDDEN);
  });
});

describe('Get user', () => {
  let cookie;

  beforeAll(async () => {
    const res = await request.post('/signup').send(DEFAULT_USER);
    cookie = res.headers['set-cookie'];
  });

  it('Returns user data but not the password', async () => {
    const res = await request.get('/users/me').set('Cookie', cookie);
    expect(res.status).toBe(statusCodes.OK);
    expect(res.body._id).toBeDefined();
    expect(res.body.email).toBe(DEFAULT_USER.email);
    expect(res.body.name).toBe(DEFAULT_USER.name);
    expect(res.body.password).toBeUndefined();
  });
});

describe('Update user', () => {
  let cookie;

  beforeAll(async () => {
    const res = await request.post('/signup').send(DEFAULT_USER);
    cookie = res.headers['set-cookie'];
  });

  beforeEach(async () => {
    await User.findOneAndDelete({ email: DEFAULT_USER.email });
    return request.post('/signup').send(DEFAULT_USER);
  });

  it('Saves all fields together', async () => {
    const res = await request.patch('/users/me').send(UPDATED_USER).set('Cookie', cookie);
    const user = await User.findOne({ email: UPDATED_USER.email }).select('+password');
    expect(user.email).toBe(UPDATED_USER.email);
    expect(user.name).toBe(UPDATED_USER.name);
    expect(bcrypt.compare(user.password, UPDATED_USER.password)).toBeTruthy();
    expect(res.status).toBe(statusCodes.OK);
    expect(typeof res.body).toBe('object');
    expect(res.body.email).toBe(UPDATED_USER.email);
    expect(res.body.name).toBe(UPDATED_USER.name);
    expect(bcrypt.compare(res.body.password, UPDATED_USER.password)).toBeTruthy();
  });

  it('Saves just email', async () => {
    const res = await request.patch('/users/me').send({ email: UPDATED_USER.email }).set('Cookie', cookie);
    const user = await User.findOne({ email: UPDATED_USER.email }).select('+password');
    expect(user.email).toBe(UPDATED_USER.email);
    expect(user.name).toBe(DEFAULT_USER.name);
    expect(bcrypt.compare(user.password, DEFAULT_USER.password)).toBeTruthy();
    expect(res.status).toBe(statusCodes.OK);
    expect(typeof res.body).toBe('object');
    expect(res.body.email).toBe(UPDATED_USER.email);
    expect(res.body.name).toBe(DEFAULT_USER.name);
    expect(bcrypt.compare(res.body.password, DEFAULT_USER.password)).toBeTruthy();
    await User.findOneAndDelete({ email: UPDATED_USER.email });
  });

  it('Saves just password', async () => {
    const res = await request.patch('/users/me').send({ password: UPDATED_USER.password }).set('Cookie', cookie);
    const user = await User.findOne({ email: DEFAULT_USER.email }).select('+password');
    expect(user.email).toBe(DEFAULT_USER.email);
    expect(user.name).toBe(DEFAULT_USER.name);
    expect(bcrypt.compare(user.password, UPDATED_USER.password)).toBeTruthy();
    expect(res.status).toBe(statusCodes.OK);
    expect(typeof res.body).toBe('object');
    expect(res.body.email).toBe(DEFAULT_USER.email);
    expect(res.body.name).toBe(DEFAULT_USER.name);
    expect(bcrypt.compare(res.body.password, UPDATED_USER.password)).toBeTruthy();
  });

  it('Saves just name', async () => {
    const res = await request.patch('/users/me').send({ name: UPDATED_USER.name }).set('Cookie', cookie);
    const user = await User.findOne({ email: DEFAULT_USER.email }).select('+password');
    expect(user.email).toBe(DEFAULT_USER.email);
    expect(user.name).toBe(UPDATED_USER.name);
    expect(bcrypt.compare(user.password, DEFAULT_USER.password)).toBeTruthy();
    expect(res.status).toBe(statusCodes.OK);
    expect(typeof res.body).toBe('object');
    expect(res.body.email).toBe(DEFAULT_USER.email);
    expect(res.body.name).toBe(UPDATED_USER.name);
    expect(bcrypt.compare(res.body.password, DEFAULT_USER.password)).toBeTruthy();
  });

  it('Does not allow changing email to one that is already taken', async () => {
    await User.create(UPDATED_USER);
    const res = await request.patch('/users/me').send({ name: UPDATED_USER.name }).set('Cookie', cookie);
    const user = User.findOne({ name: DEFAULT_USER.name });
    expect(res.code).toBe(statusCodes.CONFLICT);
    expect(res.body.message).toBe(errorMessages.CONFLICTING_EMAIL);
    expect(user.email).toBe(DEFAULT_USER.email);
    await User.findOneAndDelete({ email: UPDATED_USER.email });
  });
});

describe('Update user validation', () => {
  it.todo('Does not allow empty email');

  it.todo('Does not allow invalid email');

  it.todo('Does not allow email too long');

  it.todo('Does not allow empty password');

  it.todo('Does not allow password too short');

  it.todo('Does not allow password too long');

  it.todo('Does not allow name too short');

  it.todo('Does not allow name too long');

  it.todo('Escapes html characters when saving name');
});
