const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anshulmenaria@gmail.com',
        pass: 'xtib xjex cbap ljzp' // use environment variable in production
    }
});

const sendEmail = (to, subject, html, source = "shiftSwiftly") => {
    const senderName = source === "portfolio" ? "Anshul Menaria" : "ShiftSwiftly";

    const mailOptions = {
        from: `"${senderName}" <anshulmenaria@gmail.com>`,
        to,
        subject,
        html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
};

module.exports = sendEmail;
