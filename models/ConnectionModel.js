import mongoose from "mongoose";
const { Schema } = mongoose;

const connectionSchema = new Schema({
    fromUser: { type: Schema.Types.ObjectId, ref: 'UserSchema' },
    toUser: { type: Schema.Types.ObjectId, ref: 'UserSchema' },
    businessCard: { type: Schema.Types.ObjectId, ref: 'BusinessCard' },
});

const ConnectionModel = mongoose.model('Connection', connectionSchema);

export default ConnectionModel;