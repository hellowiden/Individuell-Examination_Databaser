// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, validate: [isEmail, 'invalid email'], index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

// Hash password before saving the user model
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (err) {
            return next(err);
        }
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
