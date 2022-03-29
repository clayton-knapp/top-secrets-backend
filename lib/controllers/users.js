// const bcrypt = require('bcryptjs/dist/bcrypt');
const { Router } = require('express');
// const User = require('../models/User');
const UserService = require('../services/UserService');

module.exports = Router()
  .post('/', async(req, res, next) => {
    try {

      const user = await UserService.hash(req.body);

      res.send(user);
    } catch (error) {
      next(error);
    }



  });
