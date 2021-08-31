const express = require('express');
const movieController = require('../controllers/movies.controller');
const router = express.Router();
const verify = require('./verifyToken');

router.get('/', movieController.listMovies);
router.get('/favorites',
  verify,
  movieController.showFavorites);
router.post('/favorites',
  verify,
  movieController.addToFavorites);
router.delete('/favorites',
  verify,
  movieController.removeFavorite);
router.put('/:id',
  verify,
  movieController.editMovie);
router.post('/new',
  verify,
  movieController.addMovie);
module.exports = router;
