const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const sendEmail = require('../Services/emailService');

const userRegistration = {
  async register(req, res, next) {
    try {
      const { name, email, number, password } = req.body;

      const phoneExist = await User.exists({ number });
      if (phoneExist) {
        return res.status(400).json({ error: 'Mobile Number Already Exists' });
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        number,
        password: hashPassword,
      });
      sendEmail(
        user.email,
        'Registration Successful',
        `Hello ${user.name},\n\nYour registration was successful! Welcome to our platform.`
      );

      res.status(201).json(user);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Server error', serverError: error.message });
    }
  },

  async getUser(req, res) {
    try {
      const users = await User.find({}, '-password');
      res.status(200).json(users);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Server error', serverError: error.message });
    }
  },
};

module.exports = userRegistration;
