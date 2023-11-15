// SMSService.js
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Twilio Auth Token
const twilioNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio phone number

const client = twilio(accountSid, authToken);

const sendSMS = async (to, body) => {
    try {
        await client.messages.create({
            body: body,
            from: twilioNumber,
            to: to
        });
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
};

export { sendSMS };