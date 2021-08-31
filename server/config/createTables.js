const {Client} = require('pg');
require('dotenv').config();
const {movies} = require('./movies.json');
const {createUsers} = require('./createUsers');

const createTables = () => {
  const client = new Client();

  client.connect(err => {
    if (err) {
      console.log('Error connecting to database.');
    } else {
      console.log('Connected.');
    }
  });

  // Create users table
  let query = `
  DROP TABLE IF EXISTS users CASCADE;

  CREATE TABLE users (
    id int generated always as identity not null,
    email varchar(88) UNIQUE NOT NULL,
    password varchar(88) NOT NULL,
    admin boolean NOT NULL,
    PRIMARY KEY (id)
  )
  `;
  client.query(query, (err, resp) => {
    if (err) {
      console.log(err);
      console.log('Error creating user table');
    } else {
      console.log('User table created');
    }
  });

  createUsers();

  // Create movies table
  query = `
  DROP TABLE IF EXISTS movies CASCADE;

  CREATE TABLE movies (
    id int unique generated always as identity NOT NULL,
    title varchar(88) UNIQUE NOT NULL,
    image varchar(255) NOT NULL
  )
  `;
  client.query(query, (err, resp) => {
    if (err) {
      console.log(err);
      console.log('Error creating movie table');
    } else {
      console.log('Movie table created');
    }
  });

  // Create favorites table
  query = `
  DROP TABLE IF EXISTS favorites CASCADE;
  CREATE TABLE favorites (
    user_id int,
    movie_id int,
    UNIQUE (user_id, movie_id),
    CONSTRAINT fk_movie
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    CONSTRAINT fk_user
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
  `;
  client.query(query, (err, resp) => {
    if (err) {
      console.log('Error creating favorites table');
    } else {
      console.log('Favorites table created');
    }
  });

  // Load movie information
  movies.forEach( movie => {
    const {title, image} = movie;
    const text = `
    INSERT INTO movies(title, image) VALUES($1, $2)
    RETURNING *
    `;
    const values = [title, image];

    client.query(text, values, (err, resp) => {
      if (err) {
        console.log('Error inserting movies');
      }
    });
  });
};

exports.createTables = createTables;
