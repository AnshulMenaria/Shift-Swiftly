const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordOTP: { type: String },
    resetPasswordExpires: { type: Date },
    // ... other fields ...
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;