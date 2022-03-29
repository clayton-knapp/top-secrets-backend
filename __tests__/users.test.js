const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('top-secrets-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('users can signup with email and password with POST', async() => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ 
        email: 'bob@bob.com', 
        password: 'bobbob' 
      });

    expect(res.body).toEqual({
      id: expect.any(String), 
      email: 'bob@bob.com'
    });



  });



  
});
