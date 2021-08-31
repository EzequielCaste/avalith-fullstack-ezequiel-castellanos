const {Client} = require('pg');
require('dotenv').config();
const {movies} = require('./movies.json');

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
  create table users (
    id int generated always as identity not null,
    email varchar(88) unique not null,
    password varchar(88) not null,
    admin boolean not null,
    primary key (id)
  )
  `;
  client.query(query, (err, resp) => {
    if (err) {
      console.log('Error creating user table');
    } else {
      console.log('User table created');
    }
  });

  // Create movies table
  query = `
  create table movies (
    id int unique generated always as identity not null,
    title varchar(88) unique not null,
    image varchar(255) not null
  )
  `;
  client.query(query, (err, resp) => {
    if (err) {
      console.log('Error creating movie table');
    } else {
      console.log('Movie table created');
    }
  });

  // Create favorites table
  query = `
  create table favorites (
    user_id int,
    movie_id int,
    unique (user_id, movie_id),
    constraint fk_movie
    foreign key (movie_id) references movies(id),
    constraint fk_user
    foreign key (user_id) references users(id)
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
    insert into movies(title, image) values($1, $2)
    returning *
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
