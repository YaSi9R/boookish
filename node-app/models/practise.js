const mongoose=require('mongoose');
const practise=new mongoose.Schema (
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        number:{
            type:Number,
            required:true,
            trim:true
        }
    }
);
module.exports=mongoose.model("practise",practise);
