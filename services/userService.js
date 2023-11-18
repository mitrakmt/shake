import {UserModel} from '../models/index.js'
import ApiError from '../utils/ApiError.js';
import bcrypt from 'bcryptjs';

const updateUserById = async (userId, updateData) => {
    try {
        const user = await UserModel.findByIdAndUpdate(userId, updateData, { new: true }).select('-email -password -__v -source');

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        // Handle or throw the error depending on your error handling strategy
        console.error('Error updating user:', error);
        throw error;
    }
};

const getUserFromId = async(userId) =>{
    const user = await UserModel.findById(userId).select('-email -password -__v -source -accountStatus -lastLogin');
    
    if(!user)
        throw new ApiError("Invaid User Id")

    // Update accountStatus and lastLogin
    user.accountStatus = "active"
    user.lastLogin = Date.now()
    await user.save()

    return user;
}

const getPublicUserById = async (userId) => {
    try {
        const user = await UserModel.findById(userId).select('-email -password -__v -source');

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        // Handle or throw the error depending on your error handling strategy
        console.error('Error updating user:', error);
        throw error;
    }
};

const updateLocation = async (userId, lat, lng) => {
    await UserModel.findByIdAndUpdate(userId, {
        'location.type': 'Point',
        'location.coordinates': [lng, lat],
        'location.timestamp': new Date()
    });
};

const getUsersInRadius = async (latitude, longitude, radiusInMiles) => {
    const radiusInMeters = radiusInMiles * 1609.34; // Convert miles to meters

    return await UserModel.find({
        'location.coordinates': {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                },
                $maxDistance: radiusInMeters
            }
        }
    }).select('-password -isVerified -premium -source -email -lastLogin -accountStatus');
};

const saveResetPasswordToken = async (email, hashedToken) => {
    try {
        // Find the user by their email
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw new Error('User not found');
        }

        // Set the reset token and expiration
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

        // Save the user with the updated fields
        await user.save();

        return user;
    } catch (error) {
        throw error;
    }
};

const doResetPasswordWithToken = async (token, newPassword) => {
    const user = await UserModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        throw new Error('Password reset token is invalid or has expired.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return user;
};

const getUserFromEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ email: email });
        return user;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
};

const verifyEmail = async (token) => {
    const user = await UserModel.findOne({
        emailVerificationToken: token,
        emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
        throw new Error('Invalid or expired token');
    }

    user.isVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;

    await user.save();

    return user;
};


export {
    getUserFromId,
    updateUserById,
    getPublicUserById,
    updateLocation,
    getUsersInRadius,
    saveResetPasswordToken,
    getUserFromEmail,
    verifyEmail,
    doResetPasswordWithToken
}