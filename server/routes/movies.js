const express = require('express');
const movieController = require('../controllers/movies.controller');
const router = express.Router();
const verify = require('./verifyToken');

router.get('/', movieController.listMovies);
router.post('/favorites',
  verify,
  movieController.addToFavorites);
router.get('/favorites',
  verify,
  movieController.showFavorites);
router.put('/:id',
  verify,
  movieController.editMovie);

module.exports = router;
