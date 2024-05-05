const jwt = require("jsonwebtoken");   

const varifyToken = (req , res , next)=>{
    console.log("inside of token varification !"); 
    console.log(req.body)
    console.log("bich") 


    const headerAuthorization = req.headers.authorization ; 
    if(headerAuthorization && headerAuthorization.startsWith("JWT")){

        const token = headerAuthorization.split(" ")[1];
        jwt.verify(token ,process.env.SECRET_TOKEN_STRING , (err , decoded)=>{
            if(err){
                console.log("invalid token !")
                return res.status(200).send({"tokenVarified" : false}) ; 
            }
            else{
                console.log(decoded.userName + " Authenticated !") ; 
                // req.body.pasword = decoded.password ; 
                req.body.userName = decoded.userName ; 
                console.log(req.body)
                next(); 
            }
        })
    }
    else return res.status(200).send({"tokenVarified" : false}) ; 
}

module.exports = varifyToken ; 