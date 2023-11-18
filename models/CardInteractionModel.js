import mongoose from 'mongoose';
const { Schema } = mongoose;

const cardInteractionSchema = new Schema({
    cardId: { type: Schema.Types.ObjectId, ref: 'BusinessCard' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    action: { type: String, enum: [ 'viewed', 'saved', 'contacted', 'scanned', 'shared', 'downloaded' ] },
    timestamp: { type: Date, default: Date.now }
});

const CardInteractionModel = mongoose.model('CardInteraction', cardInteractionSchema);

export default CardInteractionModel;