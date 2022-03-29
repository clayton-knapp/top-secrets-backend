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


  it('signs in an existing user', async() => {
    //first we sign up a user
    const user = await UserService.hash({
      email: 'bob@bob.com', 
      password: 'bobbob'
    });

    //then we test signing in the user
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({
        email: 'bob@bob.com',
        password: 'bobbob'
      });

    expect(res.body).toEqual({
      message: 'Signed in successfully',
      user,
    });
  });
  
  it('sets and retrieves currently signed in user by getting the JWT value of the cookie', async() => {
    //create a user
    await UserService.hash({
      email: 'bob@bob.com', 
      password: 'bobbob'
    });

    //get the user
    await request(app)
      .post('/api/v1/users/sessions')
      .send({
        email: 'bob@bob.com',
        password: 'bobbob'
      });

    const res = await request(app).get('/api/v1/sessions/me');

    expect(res.body).toEqual({
      id: expect.any(String), 
      email: 'bob@bob.com'
    });



  });

});
