const { Router } = require('express');
// const Secret = require('../model/Secret');


module.exports = Router()
  .get('/', (req, res, next) => {
    try {
      const secrets = [
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

      res.send(secrets);
      
    } catch (error) {
      next(error);
    }

  });