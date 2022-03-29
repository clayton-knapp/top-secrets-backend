const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../models/User');

module.exports = class UserService {
  static async hash({ email, password }) {

    //hash our password
    const hashedPassword = bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));

    //send user object with same email and hashed password and get it back
    const user = await User.insert({
      email,
      passwordHash: hashedPassword,
    });

    return user;



  }
};
