// emailFunctions.js
import sgMail from '@sendgrid/mail';

// Set your SendGrid API key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (to, subject, text, html) => {
    const msg = {
        to: to, // Change to your recipient
        from: 'noreply@getshake.io', // Change to your verified sender
        subject: subject,
        text: text,
        html: html,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        if (error.response) {
            console.error(error.response.body);
        }
        throw error;
    }
};

const sendPasswordResetEmail = async (userEmail, resetToken) => {
    const subject = 'Password Reset';
    const text = `To reset your password, please use the following token: ${resetToken}`;
    // You can also use HTML templates for better email formatting
    await sendEmail(userEmail, subject, text);
};

const sendAccountVerificationEmail = async (userEmail, verificationToken) => {
    const subject = 'Verify Your Account';
    const text = `Please use the following token to verify your account: ${verificationToken}`;
    await sendEmail(userEmail, subject, text);
};

const sendBusinessCardEmail = async (fromUser, toEmail, businessCard) => {
    const subject = `${fromUser.name} has shared a business card with you!`;
    const text = `Check out this business card from ${fromUser.name}: ${JSON.stringify(businessCard)}`;
    await sendEmail(toEmail, subject, text);
};

export { sendPasswordResetEmail, sendAccountVerificationEmail, sendBusinessCardEmail };