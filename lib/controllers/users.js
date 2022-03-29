const { Router } = require('express');

module.exports = Router()
  .post('/', async(req, res, next) => {
    try {
      const user = { id: '1', username: 'bob' };
      res.send(user);
    } catch (error) {
      next(error);
    }



  });
