const JwtService = require("../Services/JwtService");
const bcrypt = require("bcrypt");
const Transporter = require("../models/transporterModel");
const { REFRESH_SECRET } = require("../config/index");

const transporterLogin = {
  async login(req, res) {
    try {
      const { mobile, password } = req.body;

      if (!mobile || !password) {
        return res.status(400).json({ error: "Mobile number and password are required" });
      }

      const transporter = await Transporter.findOne({ mobile });

      if (!transporter) {
        return res.status(401).json({ error: "Invalid Mobile Number" });
      }

      const isPasswordValid = await bcrypt.compare(password, transporter.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid Password" });
      }

      const accessToken = JwtService.sign({ _id: transporter._id, role: 'transporter' });
      const refreshToken = JwtService.sign({ _id: transporter._id, role: 'transporter' }, "1y", REFRESH_SECRET);

      return res.status(200).json({
        accessToken,
        refreshToken,
        role: 'transporter',
        transporter // Include all transporter details
      });
    } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({ error: "Server error", serverError: error.message });
    }
  },
};

module.exports = transporterLogin;
