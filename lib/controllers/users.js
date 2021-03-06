const { Router } = require('express');
const UserService = require('../services/UserService');
// const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  //sign up route
  .post('/', async(req, res, next) => {
    try {

      const user = await UserService.hash(req.body);

      res.send(user);
    } catch (error) {
      next(error);
    }
  })
  
  //sign in existing route
  .post('/sessions', async(req, res, next) => {
    try {
      // const user = { id: '1', email: 'bob@bob.com' };

      const user = await UserService.signIn(req.body);

      //make our JWT to pass to cookie
      // const token = jwt.sign({ ...user }, process.env.JWT_SECRET, { expiresIn: '1 day' });
      const token = user.authToken();

      //attach our cookie to the response with an httpOnly prop and maxAge prop of 1 day
      res.cookie('session', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
      });

      res.send({
        message: 'Signed in successfully',
        user,
      });
      
    } catch (error) {
      next(error);
    }
  })
  //route to test getting JWT token for signed in user
  .get('/sessions', authenticate, (req, res, next) => {
    try {
      
      res.send(req.user);

    } catch (error) {
      next(error);
    }

  })

  .delete('/sessions', (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME).send({ success: true, message: 'Signed out successfully!' });
  });
