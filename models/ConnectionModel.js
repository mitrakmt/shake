import mongoose from "mongoose";
const { Schema } = mongoose;

const connectionSchema = new Schema({
    fromUser: { type: Schema.Types.ObjectId, ref: 'UserSchema' },
    toUser: { type: Schema.Types.ObjectId, ref: 'UserSchema' },
    businessCard: { type: Schema.Types.ObjectId, ref: 'BusinessCard' },
    // For searching and filtering purposes
    category: { type: String, default: null },
    tags: [String],
    notes: { type: String, default: null },
});

connectionSchema.index({ categories: 'text', tags: 'text', notes: 'text' });

const ConnectionModel = mongoose.model('Connection', connectionSchema);

export default ConnectionModel;