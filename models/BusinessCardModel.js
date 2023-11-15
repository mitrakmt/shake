import mongoose from "mongoose";
const { Schema } = mongoose;

const businessCardSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'UserSchema' },
    title: String,
    company: String,
    email: String,
    phone: String,
    website: String,
    linkedin: String,
    twitter: String,
    instagram: String,
    industry: String,
});

const BusinessCardModel = mongoose.model('BusinessCard', businessCardSchema);

export default BusinessCardModel;