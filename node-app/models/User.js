const mongoose = require("mongoose");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    account_type: {
        type: String,
        enum: ["Admin", "Student"],
        default: "Student",

    },
    image: {
        type: String,
        required: true,
    },
    college: String,
    phone: String,
    location: String,
    avatar: String,
    // Additional details
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Profile,
    },

    // / Books this user has listed for sale (My Ads)
    myAds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Post,
        }
    ],

    //  Books this user marked as favorite
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Post,
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now,
    },
},
    { timestamps: true });

module.exports = mongoose.model("User", userSchema);



