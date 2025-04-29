// const bcrypt = require('bcrypt');
// const User = require('../models/userModel');
// const sendEmail = require('../Services/emailService');

// const userRegistration = {
//   async register(req, res, next) {
//     try {
//       const { name, email, number, password } = req.body;

//       const phoneExist = await User.exists({ number });
//       if (phoneExist) {
//         return res.status(400).json({ error: 'Mobile Number Already Exists' });
//       }

//       const hashPassword = await bcrypt.hash(password, 10);
//       const user = await User.create({
//         name,
//         email,
//         number,
//         password: hashPassword,
//       });
//       sendEmail(
//         user.email,
//         'Registration Successful',
//         `Hello ${user.name},\n\nYour registration was successful! Welcome to our platform.`
//       );

//       res.status(201).json(user);
//     } catch (error) {
//       console.error('Server error:', error);
//       res.status(500).json({ error: 'Server error', serverError: error.message });
//     }
//   },

//   async getUser(req, res) {
//     try {
//       const users = await User.find({}, '-password');
//       res.status(200).json(users);
//     } catch (error) {
//       console.error('Server error:', error);
//       res.status(500).json({ error: 'Server error', serverError: error.message });
//     }
//   },
// };

// module.exports = userRegistration;


const bcrypt = require('bcrypt');
const pool = require('../Services/db');
const sendEmail = require('../Services/emailService');

const userRegistration = {
  async register(req, res) {
    try {
      const { name, email, number, password } = req.body;

      // Check if number already exists
      const [existingUser] = await pool.query(
        'SELECT * FROM users WHERE number = ?',
        [number]
      );
      if (existingUser.length > 0) {
        return res.status(400).json({ error: 'Mobile Number Already Exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      const [result] = await pool.query(
        'INSERT INTO users (name, email, number, password) VALUES (?, ?, ?, ?)',
        [name, email, number, hashedPassword]
      );

      // Send email
      sendEmail(
        email,
        'Registration Successful',
        `Hello ${name},\n\nYour registration was successful! Welcome to our platform.`
      );

      res.status(201).json({ id: result.insertId, name, email, number });

    } catch (error) {
      console.error('Registration Error:', error);
      res.status(500).json({ error: 'Server error', serverError: error.message });
    }
  },

  async getUser(req, res) {
    try {
      const [users] = await pool.query(
        'SELECT id, name, email, number, createdAt, updatedAt FROM users'
      );
      res.status(200).json(users);
    } catch (error) {
      console.error('Fetch Users Error:', error);
      res.status(500).json({ error: 'Server error', serverError: error.message });
    }
  },
};

module.exports = userRegistration;
