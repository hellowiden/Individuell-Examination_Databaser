// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

app.get('/', (req, res) => {
    res.send(`
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 20px;
            }
            h1 {
                color: #4CAF50;
            }
            h2 {
                color: #555;
            }
        </style>
        <h1>Film review platform API</h1>
        <h2>Welcome to the individual Examination - Film review platform</h2>
    `);
});

app.use('/movies', movieRoutes);
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        process.on('SIGTERM', () => {
            console.log('SIGTERM signal received: closing HTTP server');
            if (server) {
                server.close(() => {
                    console.log('HTTP server closed');
                    mongoose.connection.close(false, () => {
                        console.log('MongoDB connection closed');
                        process.exit(0);
                    });
                });
            }
        });
    })
    .catch(error => {
        console.error('Connection error', error);
    });
