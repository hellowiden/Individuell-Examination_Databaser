// controllers/reviewControllers.js

const Review = require('../models/Review');

exports.addReview = async (req, res) => {
    try {
        const { movieId, rating, comment } = req.body;
        const userId = req.user._id;

        if (!movieId || !rating || rating < 0 || rating > 10 || !userId) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const review = new Review({
            movieId,
            rating,
            comment,
            userId,
        });

        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        if (rating === undefined || rating < 0 || rating > 10) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const review = await Review.findByIdAndUpdate(req.params.id, {
            rating,
            comment,
        }, { new: true });

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
