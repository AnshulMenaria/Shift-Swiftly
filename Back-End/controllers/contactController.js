const Contact = require("../models/contactModel");
const sendEmail = require("../Services/emailService");

const contactController = {
    async createContact(req, res) {
        try {
            const contactData = { ...req.body };
            const source = contactData.source || "shiftSwiftly";
            const isPortfolio = source === "portfolio";
            const brandName = isPortfolio ? "Anshul Menaria" : "ShiftSwiftly";
            const brandName2 = isPortfolio ? "Portfolio" : "ShiftSwiftly";
            const websiteURL = isPortfolio ? "https://ansulmenaria-portfolio.netlify.app" : "https://shiftswiftly.netlify.app";

            const newContact = new Contact(contactData);
            const savedContact = await newContact.save();

            // Email to Admin
            const adminMessage = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #0057B7;">📩 New Contact Form Submission</h2>
                    <p>Hello Admin,</p>
                    <p>You’ve received a new message from the ${brandName2} contact form. Below are the details:</p>

                    <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; margin-top: 10px; font-size: 15px;">
                        <tr style="background-color: #f2f2f2;">
                            <th align="left">Full Name</th>
                            <td>${savedContact.name}</td>
                        </tr>
                        <tr>
                            <th align="left">Email Address</th>
                            <td>${savedContact.email}</td>
                        </tr>
                        <tr style="background-color: #f2f2f2;">
                            <th align="left">Message</th>
                            <td>${savedContact.message}</td>
                        </tr>
                        <tr>
                            <th align="left">Submitted At</th>
                            <td>${new Date().toLocaleString()}</td>
                        </tr>
                    </table>

                    <p style="margin-top: 20px;">Kindly respond promptly to ensure excellent support and customer satisfaction.</p>
                    <p style="margin-top: 20px;">Regards,<br/><strong>${brandName2} System</strong></p>
                </div>
            `;

            await sendEmail(
                "anshulmenaria@gmail.com",
                `📬 New Contact Request - ${brandName}`,
                adminMessage,
                source
            );

            // Auto-reply to User
            const userMessage = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #28a745;">✅ We Received Your Message</h2>
                    <p>Dear <strong>${savedContact.name}</strong>,</p>

                    <p>Thank you for contacting <strong>${brandName}</strong>. We’ve successfully received your inquiry and our team will get back to you shortly. Below is a copy of your submission for your records:</p>

                    <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; margin-top: 10px; font-size: 15px;">
                        <tr style="background-color: #f9f9f9;">
                            <th align="left">Full Name</th>
                            <td>${savedContact.name}</td>
                        </tr>
                        <tr>
                            <th align="left">Email Address</th>
                            <td>${savedContact.email}</td>
                        </tr>
                        <tr style="background-color: #f9f9f9;">
                            <th align="left">Your Message</th>
                            <td>${savedContact.message}</td>
                        </tr>
                        <tr>
                            <th align="left">Date & Time</th>
                            <td>${new Date().toLocaleString()}</td>
                        </tr>
                    </table>

                    <p style="margin-top: 20px;">We typically respond within 24–48 hours. If your inquiry is urgent, please feel free to reply to this email directly.</p>
                    <br/>
                    <p>Warm regards,<br/><strong>${brandName}</strong><br/><a href="${websiteURL}">${websiteURL}</a></p>
                </div>
            `;

            await sendEmail(
                savedContact.email,
                `Thank You for Contacting ${brandName}`,
                userMessage,
                source
            );

            res.status(201).json(savedContact);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async index(req, res) {
        try {
            const contacts = await Contact.find();
            res.status(200).json(contacts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteContact(req, res) {
        try {
            const { id } = req.params;
            const deletedContact = await Contact.findByIdAndDelete(id);
            if (!deletedContact) {
                return res.status(404).json({ message: "Contact not found" });
            }
            res.status(200).json({ message: "Contact deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = contactController;
