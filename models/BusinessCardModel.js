import mongoose from "mongoose";
const { Schema } = mongoose;

const businessCardSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'UserSchema' },
    title: { type: String, default: null },
    company: { type: String, default: null },
    email: { type: String, default: null },
    phone: { type: String, default: null },
    website: { type: String, default: null },
    linkedin: { type: String, default: null },
    twitter: { type: String, default: null },
    instagram: { type: String, default: null },
    qrCode: { type: String, default: null },
    industry: { type: String, default: null },
    calendarLink: { type: String, default: null },
});

const BusinessCardModel = mongoose.model('BusinessCard', businessCardSchema);

export default BusinessCardModel;