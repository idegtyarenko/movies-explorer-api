import supertest from 'supertest';

import app from '../app.js';
import { statusCodes, DEFAULT_ALLOWED_METHODS } from '../utils/constants.js';
import errorMessages from '../utils/strings.js';

const request = supertest(app);

describe('Common headers', () => {
  const origin = 'http://localhost:3001';
  const requestHeaders = 'content-type';

  it('OPTIONS response contains CORS headers', async () => {
    const res = await request
      .options('/')
      .set({
        Origin: origin,
        'Access-Control-Request-Headers': requestHeaders,
      });
    expect(res.headers['access-control-allow-origin']).toBe(origin);
    expect(res.headers['access-control-allow-headers']).toBe(requestHeaders);
    expect(res.headers['access-control-allow-methods']).toBe(DEFAULT_ALLOWED_METHODS);
  });
});

describe('Response to unknown endpoint', () => {
  it('GET "/" returns 404', async () => {
    const res = await request.get('/');
    expect(res.status).toBe(statusCodes.NOT_FOUND);
    expect(res.body.message).toBe(errorMessages.NOT_FOUND);
  });
});
