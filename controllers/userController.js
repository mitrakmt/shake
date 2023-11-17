import { sendPasswordResetEmail } from '../utils/emailFunctions.js';
import {
  getUserFromId, updateUserById, getPublicUserById, getUsersInRadius, updateLocation
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
    const resetToken = 'generatedToken'; // Implement token generation logic

    try {
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
 
export default { 
    getUserInfo,
    updateUserInfo,
    getPublicUser,
    requestPasswordReset,
    setLocation,
    getPublicUserLocations,
}