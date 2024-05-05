const mongoose = require("mongoose"); 
const Schema = mongoose.Schema ; 

const userSchema = new Schema({
    userName: {
        type : String ,
        required : [true , "Please enter a user name"],
        unique : [true , "This username is already taken !"]
    },
    email : {
        type : String ,
        required : [true , "Please enter a email ID"],
        unique : [true , "This email ID is already registered !"]
    },
    password : {
        type : String ,
        required : [true , "Please add a strong email ID"]
    },
    verified : {
        type : Boolean ,
        default : false
    }
}); 

const userModel = mongoose.model("userModel" , userSchema); 


module.exports = userModel ; 

