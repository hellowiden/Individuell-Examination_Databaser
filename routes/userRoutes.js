// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateObjectId = require('../middlewares/validateObjectId');

// User registration route
router.post('/register', userController.register);

// User login route
router.post('/login', userController.login);

// Get user by ID route
router.get('/:id', validateObjectId, userController.getUserById);

// Get all users route
router.get('/', userController.getAllUsers);

module.exports = router;