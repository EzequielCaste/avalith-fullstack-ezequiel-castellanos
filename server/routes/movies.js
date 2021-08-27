const express = require('express');
const movieController = require('../controllers/movies.controller');
const router = express.Router();

router.get('/', movieController.listMovies);
router.post('/favorites', movieController.addToFavorites);

module.exports = router;
