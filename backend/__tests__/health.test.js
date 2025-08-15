const request = require('supertest');
const app = require('../server');

describe('Health endpoint', () => {
  it('GET /api/health returns OK status payload', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'OK',
        message: expect.stringContaining('Sideline_Pinas API is running'),
        version: expect.any(String),
        timestamp: expect.any(String),
      })
    );
  });
});

