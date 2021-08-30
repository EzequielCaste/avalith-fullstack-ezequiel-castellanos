const {connect} = require('../config/db');
const jwt = require('jsonwebtoken');

const listMovies = async (req, res) => {
  const client = connect();
  const query = `
  select id, title, image, tags from movies
  `;
  client.query(query)
    .then(resp => {
      return res.status(200).json({
        ok: true,
        movies: resp.rows,
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        err,
      });
    });
};

const addToFavorites = async (req, res) => {
  const {movieId} = req.body;

  const {user_id: userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

  const client = connect();
  const query = `
  insert into favorites(user_id, movie_id) 
  values($1, $2)  
  `;

  client.query(query, [userId, movieId])
    .then(resp => {
      return res.status(200).json({
        ok: true,
        msg: 'Movie added to favorites',
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        err,
      });
    });
};

const removeFavorite = async (req, res) => {
  const {movieId} = req.body;

  const {user_id: userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

  const client = connect();

  const query = `
  delete from favorites
  where movie_id = $1 and
  user_id = $2
  `;

  client.query(query, [movieId, userId])
    .then(resp => {
      return res.status(200).json({
        ok: true,
        msg: 'Movie removed from favorites',
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        err,
      });
    });
};

const showFavorites = async (req, res) => {
  const {user_id: userId} = req.user;

  const client = connect();

  const query = `
  select title, id from movies
  inner join favorites
  on movies.id = favorites.movie_id
  where favorites.user_id = $1
  `;

  client.query(query, [userId])
    .then( resp => {
      // console.log(resp);
      return res.status(200).json({
        ok: true,
        favorites: resp.rows,
      });
    }).catch( err => {
      return res.status(400).json({
        ok: false,
        msg: 'Error while fetching favorites',
      });
    });
};

const editMovie = async (req, res) => {
  console.log(req.headers);
  console.log(req.body);

  const client = connect();

  const {title, image, id} = req.body;

  const query = `
  update movies
  set title = $1,
  image = $2
  where id = $3
  `;
  const values = [title, image, id];
  client.query(query, values)
    .then( resp => {
      console.log(resp);
      return res.status(200).json({
        ok: true,
        msg: 'Movie was edited',
      });
    })
    .catch( err => {
      console.log(err);
      return res.status(400).json({
        ok: false,
        msg: 'Error while updating movie',
      });
    });
};

const addMovie = async (req, res) => {
  const {title, image} = req.body;

  const client = connect();

  const query = `
  insert into movies(title, image) 
  values($1, $2)  
  `;

  client.query(query, [title, image])
    .then(resp => {
      return res.status(200).json({
        ok: true,
        msg: 'Movie added to database',
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        err,
      });
    });
};

module.exports = {
  listMovies,
  addToFavorites,
  removeFavorite,
  showFavorites,
  editMovie,
  addMovie,
};
