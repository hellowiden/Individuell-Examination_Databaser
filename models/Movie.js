// models/Movie.js

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    director: { type: String, required: true },
    releaseYear: { type: Number, required: true, min: 1888 }, 
    genre: { type: String, required: true }
});

module.exports = mongoose.model('Movie', movieSchema);
