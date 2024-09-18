const Contact = require("../models/contactModel");

const contactController = {
    async createContact(req, res, next) {
        try {
            const { name, email, message } = req.body;
            const con = await Contact.create({
                name,
                email,
                message
            });
            res.status(201).json(con);
        } catch (error) {
            res.status(500).json({ error: "Server error", serverError: error });
        }
    },
    async index(req, res, next) {
        try {
            const con = await Contact.find();
            res.status(200).json(con);
        } catch (error) {
            res.status(500).json({ error: "Server error", serverError: error });
        }
    },
    async deleteContact(req, res, next) {
        try {
            const { id } = req.params;
            const con = await Contact.findByIdAndDelete(id);
            if (!con) {
                return res.status(404).json({ error: "Contact not found" });
            }
            res.status(200).json({ message: "Contact deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Server error", serverError: error });
        }
    }
};

module.exports = contactController;
