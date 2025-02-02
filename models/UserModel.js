import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {type : String, required: true, unique: true },
    name : { type : String, default: null },
    profilePhoto : { type : String, default: null },
    isVerified: { type: Boolean, default: false },
    premium: { type: Boolean, default: false },
    email : {type : String, required : true,},
    password : {type : String, required: true},
    source: { type: String },
    linkedin: { type: String, default: null },
    twitter: { type: String, default: null  },
    instagram: { type: String, default: null },
    industry: { type: String, default: null },
    bio: { type: String, default: null },
    country: { type: String, default: null },
    city: { type: String, default: null },
    gender: { type: String, default: null },
    lastLogin: { type: Date, default: Date },
    accountStatus: { type: String, default: "active" },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: false
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: false
        },
        timestamp: Date
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    },
    emailVerificationToken: {
        type: String,
        default: null
    },
    emailVerificationExpires: {
        type: Date,
        default: null
    },
}, {
    collection: "users",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

userSchema.set('location', { default: null });

userSchema.index({ 'location.coordinates': '2dsphere' });

const UserModel = mongoose.model('UserSchema', userSchema)

export default UserModel;