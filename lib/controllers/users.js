// const bcrypt = require('bcryptjs/dist/bcrypt');
const { Router } = require('express');
// const User = require('../models/User');
const UserService = require('../services/UserService');

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
      const user = { id: '1', email: 'bob@bob.com' };
      res.send({
        message: 'Signed in successfully',
        user
      });
      
    } catch (error) {
      next(error);
    }

  });
