import { sendPasswordResetEmail } from '../utils/emailFunctions.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import {
  getUserFromId, updateUserById, getPublicUserById, getUsersInRadius, updateLocation, getUserFromEmail, saveResetPasswordToken, verifyEmail, doResetPasswordWithToken
} from '../services/userService.js';
  
const getUserInfo = async (req, res, next) => {
    const userId = req.authData.userId
    try {
        const user = await getUserFromId(userId)

        res.json({ user });
    } catch (error) {
        next(error);
    }
};

const getPublicUser = async (req, res, next) => {
    const userId = req.params.userId

    try {
        const user = await getPublicUserById(userId)

        res.json({user});
    } catch (error) {
        next(error);
    }
};

const updateUserInfo = async (req, res, next) => {
    const userId = req.authData.userId
    const userDataToUpdate = req.body;

    try {
        const responseUser = await updateUserById(userId, userDataToUpdate)
        
        res.json({
            user: responseUser
        });
    } catch (error) {
        next(error);
    }
}


const requestPasswordReset = async (req, res, next) => {
    const userEmail = req.body.email;

    // Generate a password reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    try {
        // Hash the token
        const hashedToken = await bcrypt.hash(resetToken, 10);

        // Find the user by their email
        const user = await getUserFromEmail(userEmail)

        if (!user) {
            return res.status(400).json({ message: 'No user found' });
        }

        // Save the hashed token and its expiration to the user's record
        await saveResetPasswordToken(userEmail, hashedToken);

        // Send password reset email
        await sendPasswordResetEmail(userEmail, resetToken);

        res.status(200).json({ message: 'Password reset email sent.' });
    } catch (error) {
        next(error);
    }
};

const setLocation = async (req, res) => {
    const { userId } = req.authData; // Assuming you have the user's ID from auth middleware
    const { lat, lng } = req.body;

    try {
        await updateLocation(userId, lat, lng);
        res.status(200).json({ message: 'Location updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating location', error });
    }
};

const getPublicUserLocations = async (req, res) => {
    const { latitude, longitude, radius = 50 } = req.query; // Default radius is 50 miles

    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }

    try {
        const locations = await getUsersInRadius(parseFloat(latitude), parseFloat(longitude), parseFloat(radius));
        res.status(200).json({ locations });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving locations', error });
    }
};

const verifyUserEmail = async (req, res) => {
    try {
        const { token } = req.params;
        await verifyEmail(token);
        res.status(200).json({ message: 'Email successfully verified' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const resetPasswordWithToken = async (req, res) => {
    try {
        const { token } = req.query;
        const { newPassword } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        await doResetPasswordWithToken(token, newPassword);

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
 
export default { 
    getUserInfo,
    updateUserInfo,
    getPublicUser,
    requestPasswordReset,
    setLocation,
    getPublicUserLocations,
    verifyUserEmail,
    resetPasswordWithToken
}