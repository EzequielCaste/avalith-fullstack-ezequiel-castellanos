const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {Client} = require('pg');
const {connect} = require('../config/db');
require('dotenv').config();

const register = async (req, res) => {
  const client = new Client();
  // const client = connect();

  client.connect(err => {
    if (err) {
      console.log('Error connecting to database.');
    } else {
      console.log('Connected.');
    }
  });

  const {email, password, admin} = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.array(),
    });
  }

  const query = `
  insert into users(email,password,admin,favorites) values($1, $2, $3, $4) returning *
  `;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const values = [email, hashedPassword, admin, []];

  client.query(query, values, (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json({
        ok: true,
        msg: 'User created',
        user: resp.rows[0],
      });
    }
  });
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
  select email, id, password, admin from users
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
            user_id: resp.rows[0].id,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET);
          return res.status(200).json({
            ok: true,
            msg: 'Login sucessful',
            token,
            admin: resp.rows[0].admin,
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
};

module.exports = {
  register,
  login,
};
