import { CardInteractionModel } from '../models/index.js';

const recordInteraction = async (cardId, userId, action) => {
    const interaction = new CardInteraction({ cardId, userId, action });
    await interaction.save();
};

const getCardInteractions = async (cardId) => {
    return await CardInteraction.find({ cardId });
};

export { recordInteraction, getCardInteractions };