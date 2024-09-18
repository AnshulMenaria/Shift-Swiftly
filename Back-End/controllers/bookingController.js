const Booking = require("../models/bookingModel");
const sendEmail = require("../Services/emailService");
const bookingController = { 
    async createBooking(req, res) {
        try {
            const bookingData = { ...req.body, Status: 'pending', TNumber: '' };
            const newBooking = new Booking(bookingData);
            const savedBooking = await newBooking.save();
            sendEmail(
                savedBooking.Email,
                'Booking Created',
                `Your booking from ${savedBooking.From} to ${savedBooking.To} on ${savedBooking.Date} has been created.`
            );
            res.status(201).json(savedBooking);
        } catch (error) { 
            res.status(400).json({ message: error.message });
        }
    },

    async getAllBookings(req, res) {
        try {
            const bookings = await Booking.find();
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get bookings by User ID
    async getBookingsByUserId(req, res) {
        try {
            const bookings = await Booking.find({ UserId: req.params.userId }).sort({ createdAt: -1 }); // Sort by createdAt in descending order
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get bookings by City (For Transporter)
    async getBookingsByCity(req, res) {
        try {
            const { From } = req.params; 
            const bookings = await Booking.find({ From: From });
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateBookingStatus(req, res) {
        try {
            const { status, TNumber, Reason } = req.body; 
            const updatedBooking = await Booking.findByIdAndUpdate(
                req.params.bookingId,
                { Status: status, TNumber: TNumber, Reason: Reason }, 
                { new: true }
            );

            if (status === 'Confirmed') {
                sendEmail(
                    updatedBooking.Email,
                    'Booking Confirmation',
                    `Your booking from ${updatedBooking.From} to ${updatedBooking.To} on ${updatedBooking.Date} has been confirmed by ${updatedBooking.TNumber}.`
                );
            } else if (status === 'Completed') {
                sendEmail(
                    updatedBooking.Email,
                    'Booking Completed',
                    `Your booking from ${updatedBooking.From} to ${updatedBooking.To} on ${updatedBooking.Date} has been completed.`
                );
            } else if (status === 'Rejected') {
                sendEmail(
                    updatedBooking.Email,
                    'Booking Rejected',
                    `Your booking from ${updatedBooking.From} to ${updatedBooking.To} on ${updatedBooking.Date} has been rejected. Reason: ${Reason}`
                );
            } else if (status === 'Cancelled') {
                sendEmail(
                    updatedBooking.Email,
                    'Booking Cancelled',
                    `Your booking from ${updatedBooking.From} to ${updatedBooking.To} on ${updatedBooking.Date} has been cancelled. Reason: ${Reason}`
                );
            }

            res.status(200).json(updatedBooking);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = bookingController;
