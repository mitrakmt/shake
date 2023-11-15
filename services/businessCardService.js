import { BusinessCardModel, ConnectionModel } from '../models/index.js';
import ApiError from '../utils/ApiError.js';
import QRCode from 'qrcode';

const createBusinessCard = async (cardData) => {
    try {
        const businessCard = new BusinessCardModel(cardData);

        // Generate QR code
        const qrCodeUrl = await generateQRCode(`https://www.api.getshake.io/v1/business-card/${businessCard._id}`);
        businessCard.qrCode = qrCodeUrl;

        await businessCard.save();
        return businessCard;
    } catch (error) {
        console.error('Error creating business card:', error);
        throw new ApiError(error.message);
    }
};

const generateQRCode = async (text) => {
    try {
        // Generate QR code with the text provided
        const qrCodeData = await QRCode.toDataURL(text);
        return qrCodeData;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
};

const getBusinessCardById = async (cardId) => {
    try {
        const businessCard = await BusinessCardModel.findById(cardId);
        if (!businessCard) {
            throw new ApiError('Business card not found');
        }
        return businessCard;
    } catch (error) {
        console.error('Error fetching business card:', error);
        throw new ApiError(error.message);
    }
};

const updateBusinessCardById = async (cardId, updateData) => {
    try {
        const businessCard = await BusinessCardModel.findByIdAndUpdate(cardId, updateData, { new: true });
        if (!businessCard) {
            throw new ApiError('Business card not found');
        }
        return businessCard;
    } catch (error) {
        console.error('Error updating business card:', error);
        throw new ApiError(error.message);
    }
};

const deleteBusinessCardById = async (cardId) => {
    try {
        const businessCard = await BusinessCardModel.findByIdAndDelete(cardId);
        if (!businessCard) {
            throw new ApiError('Business card not found');
        }
        return businessCard;
    } catch (error) {
        console.error('Error deleting business card:', error);
        throw new ApiError(error.message);
    }
};

const listBusinessCardsByUser = async (userId) => {
    try {
        const businessCards = await BusinessCardModel.find({ userId: userId });
        return businessCards;
    } catch (error) {
        console.error('Error listing business cards:', error);
        throw new ApiError(error.message);
    }
};

const shareBusinessCardWithUser = async (cardId, fromUserId, toUserId) => {
    try {
        // Check if the business card exists
        const cardExists = await BusinessCardModel.exists({ _id: cardId });
        if (!cardExists) {
            throw new Error('Business card not found');
        }

        // Create a new connection to represent the share
        const connection = new ConnectionModel({
            fromUser: fromUserId,
            toUser: toUserId,
            businessCard: cardId,
        });

        await connection.save();
        return connection;
    } catch (error) {
        console.error('Error sharing business card:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

const getSharedBusinessCards = async (userId) => {
    return await ConnectionModel.find({ toUser: userId }).populate('businessCard');
};

const getCardsSharedByUser = async (userId) => {
    try {
        const sharedConnections = await ConnectionModel.find({ fromUser: userId })
            .populate('businessCard')
            .populate('toUser', 'name email'); // Example of populating user details

        return sharedConnections.map(connection => ({
            card: connection.businessCard,
            sharedWith: connection.toUser
        }));
    } catch (error) {
        console.error('Error fetching shared cards:', error);
        throw error;
    }
};


export {
    createBusinessCard,
    getBusinessCardById,
    updateBusinessCardById,
    deleteBusinessCardById,
    listBusinessCardsByUser,
    shareBusinessCardWithUser,
    getSharedBusinessCards,
    getCardsSharedByUser
};