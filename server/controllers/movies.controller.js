const {connect} = require('../config/db');

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
  // const client = connect();
  console.log(req.body);
  const {userId, movieId} = req.body;

  const client = connect();
  const query = `
  insert into favorites (user_id, movie_id) values($1, $2)
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

module.exports = {
  listMovies,
  addToFavorites,
};
