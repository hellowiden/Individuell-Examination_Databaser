// middlewares/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
    const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;

    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded); 
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: 'Access denied, user not found.' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication Error:', error); 
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired.' });
        }
        res.status(400).json({ error: 'Invalid token.' });
    }
};

exports.authorize = (role) => (req, res, next) => {
    console.log('User Role:', req.user.role); 
    if (!req.user || req.user.role !== role) {
        return res.status(403).json({ error: 'Access denied, insufficient permissions.' });
    }
    next();
};
