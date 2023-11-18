import { ServerClient } from 'postmark';
import dotenv from "dotenv";
  
dotenv.config();

const postmarkClient = new ServerClient(process.env.POSTMARK_API_KEY);

const sendEmail = async (to, subject, text, html) => {
    const message = {
        "From": "hello@getshake.io",
        "To": "hello@getshake.io",
        "Subject": subject,
        "TextBody": text,
        "HtmlBody": html,
    };

    try {
        await postmarkClient.sendEmail(message);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

const sendPasswordResetEmail = async (userEmail, resetToken) => {
    const subject = 'Password Reset';
    const text = `To reset your password, please use the following link: https://www.app.getshake.io/reset-password/${resetToken}`;
    await sendEmail(userEmail, subject, text);
};

const sendAccountVerificationEmail = async (userEmail, verificationToken) => {
    const subject = 'Verify Your Account';
    const text = `Please use the following link to verify your account: https://www.app.getshake.io/verify-account/${verificationToken}`;
    await sendEmail(userEmail, subject, text);
};

const sendBusinessCardEmail = async (fromUser, toEmail, businessCard) => {
    const subject = `${fromUser.name} has shared a business card with you!`;

    let htmlContent = generateHtmlContent(businessCard, fromUser)
    await sendEmail(toEmail, subject, '', htmlContent);
};

const generateHtmlContent = (businessCard, fromUser) => {
    let htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4A90E2;">${fromUser.name}'s Business Card</h2>
            <div style="margin-bottom: 20px;">
    `;

    if (businessCard.title) {
        htmlContent += `<p><strong>Title:</strong> ${businessCard.title}</p>`;
    }
    if (businessCard.company) {
        htmlContent += `<p><strong>Company:</strong> ${businessCard.company}</p>`;
    }
    if (businessCard.industry) {
        htmlContent += `<p><strong>Industry:</strong> ${businessCard.industry}</p>`;
    }
    if (businessCard.email) {
        htmlContent += `<p><strong>Email:</strong> <a href="mailto:${businessCard.email}">${businessCard.email}</a></p>`;
    }
    if (businessCard.phone) {
        htmlContent += `<p><strong>Phone:</strong> ${businessCard.phone}</p>`;
    }
    if (businessCard.website) {
        htmlContent += `<p><strong>Website:</strong> <a href="${businessCard.website}" target="_blank">${businessCard.website}</a></p>`;
    }
    if (businessCard.instagram) {
        htmlContent += `<p><strong>Instagram:</strong> <a href="${businessCard.instagram}" target="_blank">${businessCard.instagram}</a></p>`;
    }
    if (businessCard.twitter) {
        htmlContent += `<p><strong>Twitter:</strong> <a href="${businessCard.twitter}" target="_blank">${businessCard.twitter}</a></p>`;
    }
    if (businessCard.facebook) {
        htmlContent += `<p><strong>Facebook:</strong> <a href="${businessCard.facebook}" target="_blank">${businessCard.facebook}</a></p>`;
    }
    if (businessCard.linkedin) {
        htmlContent += `<p><strong>LinkedIn:</strong> <a href="${businessCard.linkedin}" target="_blank">${businessCard.linkedin}</a></p>`;
    }

    htmlContent += `
        <div style="margin-top: 20px;">
            <a href="https://www.app.getshake.io/card/${encodeURIComponent(fromUser.username)}" 
            style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; border-radius: 5px;">
                View Profile on Shake
            </a>
        </div>
    `;

    return htmlContent;
};

export { sendPasswordResetEmail, sendAccountVerificationEmail, sendBusinessCardEmail };