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
    const user = await User.findByEmail(email);

    //if user exists compare hashed passwords
    // console.log(user.passwordHash);
    const passwordsMatch = bcrypt.compareSync(password, user.passwordHash);

    //if passwords match, return the user
    if (passwordsMatch) return user;

    //somehow add user/session to cookie?

  }
};
