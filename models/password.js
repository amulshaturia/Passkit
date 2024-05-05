const mongoose = require("mongoose"); 
const Schema = mongoose.Schema ; 

const passwordSchema = new Schema({
    userName : String , 
    platform : String , 
    platformUserName : String , 
    platformPassword : String
}); 

const passwordModel = mongoose.model("passwordModel" , passwordSchema) ; 

module.exports = passwordModel ; 