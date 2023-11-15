import {UserModel} from '../models/index.js'
import ApiError from '../utils/ApiError.js';

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

export {
    getUserFromId,
    updateUserById,
    getPublicUserById
}