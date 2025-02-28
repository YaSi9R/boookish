const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        trim: true
    },
    Category: {
        type: String,
        required: true,
        enum: [
            "Competitive Exam",
            "Engineering",
            "Magazines",
            "Management Books",
            "Medical",
            "School Books",
            "Stories"
        ],
    },
    subCategory: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(value) {
                const categoryToSubCategories = {
                    "Competitive Exam": ["UPSC", "SSC", "Banking", "Railway"],
                    "Engineering": ["Computer Science", "Mechanical", "Electrical", "Civil"],
                    "Magazines": ["Science", "Fashion", "Tech", "Entertainment"],
                    "Management Books": ["Finance", "Marketing", "HR", "Leadership"],
                    "Medical": ["Anatomy", "Pharmacology", "Surgery", "Pathology"],
                    "School Books": ["Mathematics", "Science", "History", "Geography"],
                    "Stories": ["Fiction", "Non-Fiction", "Comics", "Short Stories"]
                };

                return categoryToSubCategories[this.Category]?.includes(value);
            },
            message: props => `${props.value} is not a valid subcategory for ${props.instance.Category}`
        }
    },
    adType: {
        type: String,
        required: true,
        enum:["Buy","Exchange","Lost and Found","Sell"],

    },
    PriceType:{
        type:String,
        required:true,
        enum:["Fixed","Negotiable","Price On Call"],

    },
    Price:{
        type:Number,
        required:true,
        trim:true,
    },
    Condition:{
        type:String,
        required:true,
        enum:["Sell","Used"],

    },
    Images:{
        type:[String],
        required:true,

    },
    Publisher:{
        type:String,
    },
    MRP:{
        type:Number,
        required:true,
    },
    PublishingYear:{
        type:String,
    },
    Pages:{
        type:Number,
    },
    Language:{
        type:String,
    },
    Description:{
        type:String,
        Required:true,
    },
    Name:{
        type:String,
        required:true,
    },
    Number:{
        type:Number,
        required:true,
    },
    City:{
        type:String,
        required:true,
    },
    



});

module.exports = mongoose.model("Post", postSchema);
