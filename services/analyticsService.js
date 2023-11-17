import { CardInteractionModel } from '../models/index.js';

const recordInteraction = async (cardId, userId, action) => {
    const interaction = new CardInteractionModel({ cardId, userId, action });
    await interaction.save();
};

const getCardInteractions = async (cardId) => {
    return await CardInteractionModel.find({ cardId });
};

export { recordInteraction, getCardInteractions };