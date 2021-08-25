const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const {connect} = require('../config/db');


const register = async (req, res) => {
  const client = connect();

  const {email, password} = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.array(),
    });
  }

  const query = `
  insert into users(email,password) values($1, $2)
  returning *
  `;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const values = [email, hashedPassword];

  client.query(query, values)
    .then(resp => {
      return res.status(200).json({
        ok: true,
        msg: 'User created',
        user: resp.rows[0],
      });
    })
    .catch(err => {
      return res.status(500).json({
        ok: false,
        msg: 'Error when registering user.',
        err,
      });
    });
  await client.end();
};

module.exports = {
  register,
};
