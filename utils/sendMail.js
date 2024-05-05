const nodemailer = require("nodemailer"); 
const crypto = require("crypto"); 
const tokenModel  = require("../models/token"); 
 
const BASE_URL = "http://localhost:8000"; 

const sendMail = async (req , res  , user)=>{
    console.log("mail sendin' !"); 
    try {
        const email = user.email ; 

        let config = {
            service : "gmail" ,
            port : 587,
            secure : true,
            auth : {
                user : "theyareonlyforme@gmail.com",
                pass : process.env.PASS
            }
        }

        const transporter = nodemailer.createTransport(config);

        const token = await new tokenModel({
            userId : user._id , 
            token : crypto.randomBytes(32).toString("hex")
        }); 

        await token.save() ; 

        const link = `${BASE_URL}/user/${user._id}/verify/${token.token}` ; 


        const info = await transporter.sendMail({
            from: 'Password security App',  
            to: email , 
            subject: "verification link",  
            text : `Thank you! for registering on Passkit please verify yourself by clicking on this link ${link}` 
        });

        console.log("Message sent: %s", info.messageId);
        return info.messageID ;
    }
    catch(err){ 
        console.log(err); 
    }
}

module.exports = sendMail ; 