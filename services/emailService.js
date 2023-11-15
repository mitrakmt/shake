// emailService.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail'
    auth: {
        user: 'yourEmail@example.com',
        pass: 'yourPassword' // For Gmail, it's better to use OAuth2
    }
});

const sendEmail = async (to, subject, text, html) => {
    const mailOptions = {
        from: 'yourEmail@example.com',
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export { sendEmail };