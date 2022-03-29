// const bcrypt = require('bcryptjs/dist/bcrypt');
const { Router } = require('express');
// const User = require('../models/User');
const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');

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
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, { expiresIn: '1 day' });

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

  });
