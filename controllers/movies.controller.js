const {connect} = require('../config/db');


const listMovies = async (req, res) => {
  const client = connect();
  const query = `
  select title, image, tags from movies
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

module.exports = {
  listMovies,
};
