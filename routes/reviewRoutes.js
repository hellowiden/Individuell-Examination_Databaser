// routes/reviewRoutes.js

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticate } = require('../middlewares/auth');
const validateObjectId = require('../middlewares/validateObjectId');

router.post('/', authenticate, reviewController.addReview);
router.get('/', reviewController.getReviews);
router.get('/:id', validateObjectId, reviewController.getReviewById);
router.put('/:id', validateObjectId, authenticate, reviewController.updateReview);
router.delete('/:id', validateObjectId, authenticate, reviewController.deleteReview);

module.exports = router;