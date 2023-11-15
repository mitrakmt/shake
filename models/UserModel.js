import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {type : String, required: true },
    name : { type : String, default: null },
    profilePhoto : { type : String, default: null },
    verified: { type: Boolean, default: false },
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
    lastLogin: { type: Date, default: Date.now() },
    accountStatus: { type: String, default: "active" },
},{collection : "users"})

const UserModel = mongoose.model('UserSchema', userSchema)

export default UserModel;