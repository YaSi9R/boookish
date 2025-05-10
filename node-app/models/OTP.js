const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate=require("../mail/templates/emailVerificationTemplate")
const OTPSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*5,
    },
});

async function sendVerifcationEmail(email,otp) {
    try{
        const mailResponse=await mailSender(email,"Verification Email from Bookish",emailTemplate(otp));
        console.log(mailResponse);
        console.log("Email sent successfully: ", mailResponse.response);

    }
    catch(error) {
        console.log("Error occured in sending otp in otpSchema");
        throw error;
    }
}


OTPSchema.pre("save",async function(next) {
if (this.isNew) {
		await sendVerifcationEmail(this.email, this.otp);
	}   
     next();
});

const OTP=mongoose.model("OTP",OTPSchema);
module.exports=OTP;