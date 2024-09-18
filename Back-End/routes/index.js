const express = require('express');
const adminLogin = require('../controllers/adminLogin');
const transporterLogin = require('../controllers/transporterLogin');
const userLogin = require('../controllers/userLogin');
const transporterRegister = require('../controllers/transporterRegister');
const userRegistration = require('../controllers/userRegistration');
const reviewController = require('../controllers/reviewController');
const bookingController = require('../controllers/bookingController');
const contactController = require('../controllers/contactController');

const router = express.Router();

router.post("/adminlogin", adminLogin.login);
router.post("/aregister", adminLogin.register);


router.post("/tlogin", transporterLogin.login);
router.post("/tregister", transporterRegister.register);
router.get("/cities", transporterRegister.getCities);
router.get("/allcities", transporterRegister.getAllCities);
router.get('/transporter/:id', transporterRegister.getTransporterById);
router.put('/transporter/:id', transporterRegister.updateTransporter);
router.delete('/transporter/:id', transporterRegister.deleteTransporter);


router.post("/ulogin", userLogin.login);
router.post("/uregister", userRegistration.register);
router.get('/users', userRegistration.getUser);
router.post('/userforgotpassword', userLogin.forgotPassword);
router.post('/userverifyotp', userLogin.verifyOTP);


router.get("/review", reviewController.index);
router.post("/review", reviewController.post);
router.delete("/review/:id", reviewController.deleteReview);


router.get("/contact", contactController.index);
router.post("/contact", contactController.createContact);
router.delete("/contact/:id", contactController.deleteContact);


router.post("/bookings", bookingController.createBooking);
router.get("/bookings", bookingController.getAllBookings);
router.get("/bookings/user/:userId", bookingController.getBookingsByUserId);
router.get('/bookings/city/:From', bookingController.getBookingsByCity);
router.patch("/bookings/:bookingId/status", bookingController.updateBookingStatus);


module.exports = router;
