const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {connect} = require('../config/db');
require('dotenv').config();

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
          const payload = {
            email,
            user_id: resp.rows[0].id,
            password: resp.rows[0].password,
            admin: resp.rows[0].admin,
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
  login,
};
