const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
      client.end();
      return res.status(200).json({
        ok: true,
        msg: 'User created',
        user: resp.rows[0],
      });
    })
    .catch(err => {
      client.end();
      return res.status(500).json({
        ok: false,
        msg: 'Error when registering user.',
        err,
      });
    });
  client.end();
};

const login = async (req, res) => {
  const client = connect();
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.array(),
    });
  }

  const {email, password} = req.body;

  const query = `
  select email, password from users
  where email = $1
  `;

  client.query(query, [email])
    .then(resp => {
      if (resp.rowCount === 0) {
        return res.status(404).json({
          ok: false,
          msg: 'User not found',
        });
      } else {
        if (bcrypt.compareSync(password, resp.rows[0].password)) {
          // user password ok send token
          const payload = {
            email,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET);
          return res.status(200).json({
            ok: true,
            msg: 'Login sucessful',
            token,
          });
        } else {
          return res.status(400).json({
            ok: false,
            msg: 'Authentication failed',
          });
        }
      }
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: 'Database error',
      });
    });
  client.end();
};

module.exports = {
  register,
  login,
};
