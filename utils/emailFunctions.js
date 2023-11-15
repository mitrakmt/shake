// emailFunctions.js
import { sendEmail } from '../services/emailService.js';

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