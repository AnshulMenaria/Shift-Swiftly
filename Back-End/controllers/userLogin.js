const JwtService = require("../Services/JwtService");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const sendEmail = require("../Services/emailService");
const generateOTP = require("../Services/generateOTP");

const userLogin = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      } 

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: "Invalid Email" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid Password" });
      }

      const accessToken = JwtService.sign({ _id: user._id, role: user.role });
      const refreshToken = JwtService.sign({ _id: user._id, role: user.role }, "1y", process.env.REFRESH_SECRET);

      return res.status(200).json({
        accessToken,
        refreshToken,
        role: 'user',
        user 
      });
    } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({ error: "Server error", serverError: error.message });
    }
  },
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const otp = generateOTP();

      user.resetPasswordOTP = otp;
      user.resetPasswordExpires = Date.now() + 3600000;
      await user.save();

      sendEmail(
        user.email,
        'Password Reset OTP',
        `Your OTP for password reset is: ${otp}`
      );

      res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
      console.error('Server error in forgotPassword:', error);
      res.status(500).json({ error: 'Server error', serverError: error.message });
    }
  },
  async verifyOTP(req, res) {
    try {
      const { email, otp, newPassword } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

   

      if (user.resetPasswordOTP !== otp) {
        console.log('OTP does not match');
      }
      if (Date.now() > user.resetPasswordExpires) {
        console.log('OTP has expired');
      }
      if (user.resetPasswordOTP !== otp || Date.now() > user.resetPasswordExpires) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
      }

      const hashPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashPassword;
      user.resetPasswordOTP = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Server error in verifyOTP:', error);
      res.status(500).json({ error: 'Server error', serverError: error.message });
    }
  },
};

module.exports = userLogin;