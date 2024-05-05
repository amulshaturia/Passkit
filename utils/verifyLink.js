const userModel = require("../models/user"); 
const tokenModel = require("../models/token"); 


const verifyLink = async (req , res)=>{
    try{
        
        const user = await userModel.findOne({_id : req.params.id}); 
        if(!user){
            return res.status(400).send("Invalid Link"); 
        }
        const token = await tokenModel.findOne({userId : user._id}); 
        if(!token){
            return res.status(400).send("Invalid Link"); 
        }

        await userModel.updateOne({_id : user._id }, {$set:{verified : true}}) ; 
        await tokenModel.findOneAndDelete({userId : user._id}); 
        await user.save(); 
        
        res.send('<h1>You have been varified !</h1> <br></br> <h3>You can login now </h3>')

    }
    catch(err){
        console.log(err) ; 
        return res.status(500).send("Internal server error !"); 
    }
}

module.exports = verifyLink ; 