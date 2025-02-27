const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type:String,
            required:true,
            trim:true,
        },
        contactNumber:{
            type:Number,
            required:true,
            trim:true,
        }
    }

)