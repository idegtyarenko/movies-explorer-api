import supertest from 'supertest';
import mongoose from 'mongoose';

import app from '../app.js';
import { DATABASE_URL } from '../utils/config.js';
import { DEFAULT_USER } from '../fixtures/users.js';
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
  beforeAll(async () => {
    await User.findOneAndDelete({ email: DEFAULT_USER.email });
    return request.post('/signup').send(DEFAULT_USER);
  });

  it.todo('Saves all fields together');

  it.todo('Saves just email');

  it.todo('Saves just password');

  it.todo('Saves just name');

  it.todo('Does not allow changing email to one that already exists');

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
