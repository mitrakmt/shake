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
    }).select('-password -verified -premium -source -email -lastLogin -accountStatus');
};

export {
    getUserFromId,
    updateUserById,
    getPublicUserById,
    updateLocation,
    getUsersInRadius
}