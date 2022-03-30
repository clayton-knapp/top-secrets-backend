const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');

module.exports = class User {
  id;
  email;
  #passwordHash;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
  }

  static async insert ({ email, passwordHash }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        users (email, password_hash)
      VALUES
        ($1, $2)
      RETURNING
        *
      `,
      [email, passwordHash]
    );

    return new User(rows[0]);
  }


  //find by email method to use for sign in
  static async findByEmail(email) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        users
      WHERE
        email=$1
      `,
      [email]
    );

    //guard clause if we don't get a row back return early
    if (!rows[0]) return null;

    return new User(rows[0]);
  }


  //getter method to return hashed password for comparison in sign in
  get passwordHash() {
    return this.#passwordHash;
  }


  //make auth token here because we have user model
  authToken() {
    return jwt.sign({ ...this }, process.env.JWT_SECRET, { expiresIn: '1 day' });
  }

};
