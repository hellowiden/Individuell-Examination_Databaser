// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateObjectId = require('../middlewares/validateObjectId');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', validateObjectId, userController.getUserById);
router.get('/', userController.getAllUsers);

module.exports = router;