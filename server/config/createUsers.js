const {Client} = require('pg');
require('dotenv').config();
const request = require('request');

const createUsers = () => {
  const client = new Client();

  client.connect(err => {
    if (err) {
      console.log('Error connecting to database.');
    } else {
      console.log('Connected.');
    }
  });

  client.query(`
  DELETE FROM users`)
    .catch( err => console.log(err));

  let email = 'test@test.com';
  const password = '123';
  let admin = false;

  // Create ADMIN user
  request.post('http://localhost:3000/users/register', {
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({email, password, admin}),
  }, (err, resp, body) => {
    if (err) {
      console.log(err);
    } else {
      console.log(body);
    }
  });

  // Create user NOT ADMIN
  email = 'admin@test.com';
  admin = true;

  request.post('http://localhost:3000/users/register', {
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({email, password, admin}),
  }, (err, resp, body) => {
    if (err) {
      console.log(err);
    } else {
      console.log(body);
    }
  });
};

exports.createUsers = createUsers;
