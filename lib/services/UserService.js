const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../models/User');

module.exports = class UserService {

  // hash password method
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

  //sign in user method  
  static async signIn({ email, password }) {
    // we want to check if user exists

    //if user exists compare hashed passwords

    //if passwords match, return the user

    //somehow add user/session to cookie?

  }
};
