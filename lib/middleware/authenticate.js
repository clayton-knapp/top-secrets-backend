const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    //get the value from the cookie (jwt)
    const { session } = req.cookies;

    //verify the jwt
    const payload = jwt.verify(session, process.env.JWT_SECRET);
    req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
}