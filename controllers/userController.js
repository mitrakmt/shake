import { sendPasswordResetEmail } from '../utils/emailFunctions.js';
import {
  getUserFromId, updateUserById, getPublicUserById
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
 
export default { 
    getUserInfo,
    updateUserInfo,
    getPublicUser,
    requestPasswordReset
}