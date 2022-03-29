const bcrypt = require('bcryptjs/dist/bcrypt');
const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', async(req, res, next) => {
    try {

      //hash our password
      const hashedPassword = bcrypt.hashSync(req.body.password, Number(process.env.SALT_ROUNDS));

      //send user object with same email and hashed password and get it back
      const user = await User.insert({
        email: req.body.email,
        passwordHash: hashedPassword,
      });

      res.send(user);
    } catch (error) {
      next(error);
    }



  });
