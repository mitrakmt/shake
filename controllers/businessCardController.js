import {
    createBusinessCard,
    getBusinessCardById,
    updateBusinessCardById,
    deleteBusinessCardById,
    listBusinessCardsByUser,
    shareBusinessCardWithUser,
    getSharedBusinessCards,
    getCardsSharedByUser,
} from '../services/businessCardService.js';
import { sendBusinessCardEmail } from '../utils/emailFunctions.js';

const createCard = async (req, res, next) => {
    const cardData = { ...req.body, userId: req.authData.userId };

    try {
        const newCard = await createBusinessCard(cardData);

        res.status(201).json({ businessCard: newCard });
    } catch (error) {
        next(error);
    }
};

const getCard = async (req, res, next) => {
    const cardId = req.params.cardId;

    try {
        const card = await getBusinessCardById(cardId);
        res.json({ businessCard: card });
    } catch (error) {
        next(error);
    }
};

const updateCard = async (req, res, next) => {
    const cardId = req.params.cardId;
    const updateData = req.body;

    try {
        const updatedCard = await updateBusinessCardById(cardId, updateData);
        res.json({ businessCard: updatedCard });
    } catch (error) {
        next(error);
    }
};

const deleteCard = async (req, res, next) => {
    const cardId = req.params.cardId;

    try {
        await deleteBusinessCardById(cardId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const listUserCards = async (req, res, next) => {
    const userId = req.authData.userId;

    try {
        const cards = await listBusinessCardsByUser(userId);
        res.json({ businessCards: cards });
    } catch (error) {
        next(error);
    }
};

const shareCard = async (req, res, next) => {
    const { cardId, toUserId } = req.body;
    const fromUserId = req.authData.userId;

    try {
        const connection = await shareBusinessCardWithUser(cardId, fromUserId, toUserId);
        res.status(201).json({ message: 'Card shared successfully', connection });
    } catch (error) {
        next(error);
    }
};

const getSharedCards = async (req, res, next) => {
    const userId = req.authData.userId;

    try {
        const sharedCards = await getSharedBusinessCards(userId);
        res.json({ sharedCards });
    } catch (error) {
        next(error);
    }
};

const shareBusinessCardByEmail = async (req, res, next) => {
    const userId = req.authData.userId; // Assuming you have the user's ID from auth middleware
    const { cardId, recipientEmail } = req.body;

    try {
        const businessCard = await getBusinessCardById(cardId);

        // Optional: Check if the business card belongs to the current user
        if (businessCard.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You can only share your own business cards.' });
        }

        await sendBusinessCardEmail(req.authData, recipientEmail, businessCard);
        res.status(200).json({ message: 'Business card shared successfully.' });
    } catch (error) {
        next(error);
    }
};

const fetchSharedCardsByCurrentUser = async (req, res, next) => {
    const userId = req.authData.userId; // Assuming the user's ID is stored in req.authData

    try {
        const sharedCards = await getCardsSharedByUser(userId);
        res.json({ sharedCards });
    } catch (error) {
        next(error);
    }
};

export default {
    createCard,
    getCard,
    updateCard,
    deleteCard,
    listUserCards,
    shareCard,
    getSharedCards,
    shareBusinessCardByEmail,
    fetchSharedCardsByCurrentUser
};