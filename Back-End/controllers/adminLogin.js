const JwtService = require("../Services/JwtService");
const bcrypt = require("bcrypt");
const { REFRESH_SECRET } = require("../config/index");
const Admin = require("../models/adminLogin");

const adminLogin = {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "username and password are required" });
      }

      const admin = await Admin.findOne({ username });

      if (!admin) {
        return res.status(401).json({ error: "Invalid Username" });
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid Password" });
      }

      const accessToken = JwtService.sign({ _id: admin._id, role: 'admin' });
      const refreshToken = JwtService.sign({ _id: admin._id, role: 'admin' }, "1y", REFRESH_SECRET);

      return res.status(200).json({ response: "valid", accessToken, refreshToken, role: 'admin' });
    } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({ error: "Server error", serverError: error.message });
    }
  },
  async register(req, res, next) {
    try {
      const {  username,password} = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const admin = await Admin.create({
        username,
        password: hashPassword,
      });

      res.status(201).json(admin);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Server error", serverError: error.message });
    }
  },
};

module.exports = adminLogin;
