
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


  it('returns a list of secrets', async() => {

    const expected = [
      { title: 'My cats name', description: 'Sterling' },
      { title: 'My dogs name', description: 'trick question' }
    ];

    const res = await request(app)
      .get('/api/v1/secrets');

    expect(res.body).toEqual(expected);
  });

});
