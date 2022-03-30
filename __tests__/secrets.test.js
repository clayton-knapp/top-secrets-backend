
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const UserService = require('../lib/services/UserService');

describe('top-secrets-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });


  it('returns a list of secrets for logged in user', async() => {
    const agent = request.agent(app);

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

    // //create a user
    // await UserService.hash({
    //   email: 'cat@cat.com', 
    //   password: 'cat'
    // });

    // //sign in the user
    // await UserService.signIn(
    //   {
    //     email: 'cat@cat.com', 
    //     password: 'cat'
    //   });

    // Test authentication for the endpoint
    // No user signed in:
    let res = await agent
      .get('/api/v1/secrets');

    // Should get an "unauthenticated" status:
    expect(res.status).toEqual(401);


    //TEST WITH SIGNED IN USER
    // create a user
    await agent
      .post('/api/v1/users')
      .send({ 
        email: 'bob@bob.com', 
        password: 'bobbob' 
      });


    //sign in user
    await agent
      .post('/api/v1/users/sessions')
      .send({ 
        email: 'bob@bob.com', 
        password: 'bobbob' 
      });

    res = await agent //do i need agent here?
      .get('/api/v1/secrets');

    expect(res.body).toEqual(expected);
  });


  //Logged in users can create new secrets by POSTing to /api/v1/secrets

  it('lets logged in user create a secret', async() => {
    const agent = request.agent(app);

    const expected =
      { 
        id: expect.any(String),
        title: 'My big secret', 
        description: 'I love money',
        createdAt: expect.any(String)
      };

    // TEST ENDPOINT FOR NO USER SIGNED IN
    let res = await agent //do i need agent here?
      .post('/api/v1/secrets')
      .send({ 
        title: 'My big secret', 
        description: 'I love money',
      });

    // Should get an "unauthenticated" status:
    expect(res.status).toEqual(401);


    //TEST WITH SIGNED IN USER
    // create a user
    await agent
      .post('/api/v1/users')
      .send({ 
        email: 'bob@bob.com', 
        password: 'bobbob' 
      });

    //sign in user
    await agent
      .post('/api/v1/users/sessions')
      .send({ 
        email: 'bob@bob.com', 
        password: 'bobbob' 
      });


    res = await agent //do i need agent here?
      .post('/api/v1/secrets')
      .send({ 
        title: 'My big secret', 
        description: 'I love money',
      });

    expect(res.body).toEqual(expected);

  });

});

