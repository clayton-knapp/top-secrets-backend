const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    //get the value from the cookie (jwt)
    // const { session } = req.cookies;
    const cookie = req.cookies[process.env.COOKIE_NAME];

    console.log('COOKIE', cookie);

    //check the cookie
    if (!cookie) throw new Error('You must be signed in to continue');

    //verify the jwt
    const payload = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = payload;

    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
