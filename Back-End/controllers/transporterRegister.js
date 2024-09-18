const bcrypt = require("bcrypt");
const Transporter = require("../models/transporterModel");

const transporterRegister = {
  async register(req, res) {
    try {
      const { name, email, mobile, city, password } = req.body;

      const phoneExist = await Transporter.exists({ mobile });
      if (phoneExist) {
        return res.status(400).json({ error: "Mobile Number Already Exists" });
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const transporter = await Transporter.create({
        name,
        email,
        mobile,
        city,
        password: hashPassword,
      });

      res.status(201).json(transporter);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Server error", serverError: error.message });
    }
  },

  async getCities(req, res) {
    try {
      const cities = await Transporter.distinct('city');
      const citiesWithTransporters = await Promise.all(
        cities.map(async (city) => {
          const transporters = await Transporter.find({ city });
          return { city, transporters };
        })
      );
      res.status(200).json(citiesWithTransporters);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Server error', serverError: error.message });
    }
  },

  async getAllCities(req, res) {
    try {
      const cities = await Transporter.distinct('city');
      res.status(200).json(cities);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Server error', serverError: error.message });
    }
  },

  async getTransporterById(req, res) {
    try {
      const transporter = await Transporter.findById(req.params.id, '-password');
      if (!transporter) {
        return res.status(404).json({ error: 'Transporter not found' });
      }
      res.status(200).json(transporter);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Server error', serverError: error.message });
    }
  },

  async updateTransporter(req, res) {
    try {
      const { id } = req.params;
      const { name, email, mobile, city, password } = req.body;
      const updateData = { name, email, mobile, city };

      if (password) {
        const hashPassword = await bcrypt.hash(password, 10);
        updateData.password = hashPassword;
      }

      const updatedTransporter = await Transporter.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!updatedTransporter) {
        return res.status(404).json({ error: 'Transporter not found' });
      }

      res.status(200).json(updatedTransporter);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Server error', serverError: error.message });
    }
  },

  async deleteTransporter(req, res) {
    try {
      const { id } = req.params;
      const deletedTransporter = await Transporter.findByIdAndDelete(id);
      if (!deletedTransporter) {
        return res.status(404).json({ error: 'Transporter not found' });
      }
      res.status(200).json({ message: 'Transporter deleted successfully' });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Server error', serverError: error.message });
    }
  }
};

module.exports = transporterRegister;
