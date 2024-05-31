// controllers/movieControllers.js

const Movie = require('../models/Movie');
const Review = require('../models/Review');

exports.addMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getMovieReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ movieId: req.params.id });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};