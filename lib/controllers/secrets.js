const { Router } = require('express');
const Secret = require('../models/Secret');
const authenticate = require('../middleware/authenticate');


module.exports = Router()
  .get('/', authenticate, async(req, res, next) => {
    try {
      const secrets = await Secret.getSecrets();

      res.send(secrets);
      
    } catch (error) {
      next(error);
    }

  })

  .post('/', authenticate, async(req, res, next) => {
    try {
      const secret = await Secret.createSecret(req.body);

      res.send(secret);
      
    } catch (error) {
      next(error);
    }

  });
