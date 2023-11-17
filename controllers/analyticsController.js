import { recordInteraction, getCardInteractions } from '../services/analyticsService.js';

const logInteraction = async (req, res) => {
    try {
        await recordInteraction(req.body.cardId, req?.authData?.userId, req.body.action);
        res.status(200).json({ message: 'Interaction recorded successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const fetchInteractions = async (req, res) => {
    try {
        const interactions = await getCardInteractions(req.params.cardId);
        res.json(interactions);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { logInteraction, fetchInteractions };