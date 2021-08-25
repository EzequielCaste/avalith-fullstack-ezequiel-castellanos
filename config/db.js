const {Client} = require('pg');
require('dotenv').config();

function connect() {
  const client = new Client();
  client.connect(err => {
    if (err) {
      console.log('Error connecting to database.');
    } else {
      console.log('Connected.');
    }
  });
  return client;
}

exports.connect = connect;
