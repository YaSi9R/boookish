const mongoose = require('mongoose');
const mongoose = require("mongoose");

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

    college: String,
    phone: String,
    location: String,
    avatar: String,

    // / Books this user has listed for sale (My Ads)
    myAds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        }
    ],

    //  Books this user marked as favorite
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now,
    },
},
{ timestamps: true });

module.exports = mongoose.model("User", userSchema);



module.exports = mongoose.model("user", userSchema);