const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service
    auth: {
        user: 'anshul9145946510@gmail.com',
        pass: 'ydnr intr rbsz dbhd'
    }
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: '"ShiftSwiftly" <anshul9145946510@gmail.com>',
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
};

module.exports = sendEmail;
