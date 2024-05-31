// routes/movieRoutes.js

const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { authenticate, authorize } = require('../middlewares/auth');
const validateObjectId = require('../middlewares/validateObjectId');

router.post('/', authenticate, authorize('admin'), movieController.addMovie);
router.get('/', movieController.getMovies);
router.get('/:id', validateObjectId, movieController.getMovieById);
router.put('/:id', validateObjectId, authenticate, authorize('admin'), movieController.updateMovie);
router.delete('/:id', validateObjectId, authenticate, authorize('admin'), movieController.deleteMovie);
router.get('/:id/reviews', validateObjectId, movieController.getMovieReviews);

module.exports = router;