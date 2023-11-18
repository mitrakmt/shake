import {
    createBusinessCard,
    getBusinessCardById,
    updateBusinessCardById,
    deleteBusinessCardById,
    listBusinessCardsByUser,
    shareBusinessCardWithUser,
    getSharedBusinessCards,
    getCardsSharedByUser,
    updateConnectionNotes,
    getCardsBySearch,
    updateCardCategoryAndTags
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
        if (businessCard.user._id.toString() !== userId) {
            return res.status(403).json({ message: 'You can only share your own business cards.' });
        }


        await sendBusinessCardEmail(businessCard.user, recipientEmail, businessCard);
        res.status(200).json({ message: 'Business card shared successfully.' });
    } catch (error) {
        next(error);
    }
};

const shareBusinessCardBySms = async (req, res, next) => {
    const userId = req.authData.userId; // Assuming you have the user's ID from auth middleware
    const { cardId, recipientPhoneNumber } = req.body;

    try {
        const businessCard = await getBusinessCardById(cardId);

        // Optional: Check if the business card belongs to the current user
        if (businessCard.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You can only share your own business cards.' });
        }

        // Prepare the business card details for SMS
        const cardDetails = `Business Card: ${businessCard.title}\nCompany: ${businessCard.company}\nContact: ${businessCard.email} / ${businessCard.phone}`;

        await sendSMS(recipientPhoneNumber, cardDetails);
        res.status(200).json({ message: 'Business card shared successfully via SMS.' });
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

const searchBusinessCards = async (req, res) => {
    try {
        const { query, category, tags } = req.query;
        let searchCriteria = {};

        if (query) {
            searchCriteria.$text = { $search: query };
        }
        if (category) {
            searchCriteria.category = category;
        }
        if (tags) {
            searchCriteria.tags = { $in: tags.split(',') };
        }

        const cards = await getCardsBySearch(searchCriteria);
        res.json(cards);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateCategoryAndTags = async (req, res) => {
    const { connectionId } = req.params;
    const { category, tags } = req.body;

    try {
        const updatedCard = await updateCardCategoryAndTags(connectionId, category, tags);
        res.json(updatedCard);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const editConnectionNotes = async (req, res) => {
    const { connectionId } = req.params;
    const { notes } = req.body;

    try {
        const updatedConnection = await updateConnectionNotes(connectionId, notes);
        res.json(updatedConnection);
    } catch (error) {
        res.status(500).send(error.message);
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
    fetchSharedCardsByCurrentUser,
    shareBusinessCardBySms,
    updateCategoryAndTags,
    searchBusinessCards,
    editConnectionNotes
};