
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('top-secrets-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });


  it('returns a list of secrets for logged in user', async() => {
    //create a user
    await UserService.hash({
      email: 'bob@bob.com', 
      password: 'bobbob'
    });

    //sign in the user
    await UserService.signIn(
      {
        email: 'bob@bob.com',
        password: 'bobbob'
      });

    const expected = [
      { 
        id: expect.any(String),
        title: 'My cats name', 
        description: 'Sterling',
        createdAt: expect.any(String)
      },
      { 
        id: expect.any(String),
        title: 'My dogs name', 
        description: 'trick question',
        createdAt: expect.any(String)
      }
    ];

    const res = await request(app)
      .get('/api/v1/secrets');

    expect(res.body).toEqual(expected);
  });


  //Logged in users can create new secrets by POSTing to /api/v1/secrets

});
