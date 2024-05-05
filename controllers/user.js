const crypto = require("crypto-js");
const passwordModel = require("../models/password");
const userModel = require("../models/user");
const tokenModel = require("../models/token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");

const register = async (req, res) => {
    // console.log("inseide register"); 
    let { userName, email, password } = req.body;

    let alreadyPresent = await userModel.findOne({ userName });
    if (alreadyPresent) {
        return res.status(200).json({takenUserName : true});
    }
    alreadyPresent = await userModel.findOne({ email });

    if (alreadyPresent) {
        return res.status(200).json({usedEmail : true});

    }

    const hashed_pass = await bcrypt.hash(password, 10);

    let user = new userModel({
        userName: req.body.userName,
        email: req.body.email,
        password: hashed_pass
    });
    await user.save();


    const messageID = await sendMail(req, res, user);

   res.send({
    "ok" : true 
   })
}

const login = async (req, res) => {
    // console.log("inseide login"); 
    const { userName, email, password } = req.body;
    // console.log(`${userName } , ${email}`) ; 

    const user = await userModel.findOne({ $or: [{userName : userName} , {email : email}]});
    if (!user) {
        return res.status(200).send({
            "found" : false 
        });
    }

    if (!user.verified) {
        await tokenModel.findOneAndDelete({ userId: user._id });
        sendMail(res, res, user);
        return res.status(200).send({
            "found" : true , 
            "varified" : false
        });
    }

    if (await bcrypt.compare(password, user.password)) {
        // console.log("login success!"); 
        let payload = {
            userName : user.userName,
            email: user.email,
            id: user.id
        }
        let token = jwt.sign(payload, process.env.SECRET_TOKEN_STRING, { expiresIn: "60m" });
        
        res.send({
            "ok" : true ,
            "verified" : true , 
            "token" : token, 
            "found" : true,
            "userName" : user.userName 
         }); 
    }
    else {
        // console.log("password galat hei"); 
       res.send({
        "found" : true,
        "userName" : user.userName ,
        "wrong_password" : true
    }); 
    }
}

const getAll = async (req, res) => {
    // console.log("req has came!"); 
    const key = req.body.password;
    // console.log("key : "+ req.body.password);
    // console.log("userName : "+ req.body.userName);
    console.log("key : "+ req.body.password);
    
    let passwords ;  
    
    if(req.body.userName !== ""){
        passwords = await passwordModel.find({userName : req.body.userName});
    }
    else passwords = await passwordModel.find({email : req.body.email});

    let decrypted_platformPassword, encrypted_platformPassword;

    for (let i = 0; i < passwords.length; i++) {
        encrypted_platformPassword = passwords[i]["platformPassword"];
        decrypted_platformPassword = crypto.AES.decrypt(encrypted_platformPassword, key).toString(crypto.enc.Utf8);
        // console.log("amul bhai " + decrypted_platformPassword) ; 
        passwords[i]["platformPassword"] = decrypted_platformPassword;
    }

   
    const response = {
        "tokenVarified" : true ,
        passwords
    }
    res.status(200).send(response) ; 
}

const addPassword = async (req, res) => {
    // console.log("inside Addinggggg !!!!!"); 
    const { platform, platformUserName, platformPassword } = req.body;
    const key = req.body.password ;
//   console.log(key)
console.log(platformPassword)
    if (!platform || !platformUserName || !platformPassword) {
        return res.status(400).send("All fields are mandatory");
    }

    const encrypted_platformPassword = crypto.AES.encrypt(platformPassword, key).toString();

    const password = new passwordModel({
        userName: req.body.userName,
        platform,
        platformUserName,
        platformPassword: encrypted_platformPassword
    });

    try {
        password.save();
        // console.log(password)
        res.status(201).json({"ok" : true});
    }
    catch (error) {
        // console.log("sorry there's some error while saving ", error);
        res.status(500).json({"ok" : false}) ; 
    }
}

const userDetail = async(req, res) => {
    let data = await passwordModel.find();
    console.log(data.length) ; 
    res.json({'tokenVarified': true , data}) ; 
}

const deletePassword = async(req , res) =>{
    // console.log("inside delete.......................................................") ; 
    try{
        console.log(req.body.del_id); 
        const xx = await passwordModel.findByIdAndDelete(req.body.del_id) ; 
  
        // console.log("xyz"); 
        res.status(200).send({
            "del_ok" : true 
        }); 
    }
    catch(err){
        // console.log("error deleting password " + err) ; 
        res.send(500).json({message : "del error from server"}); 
    }
}

module.exports = { register, login, getAll, addPassword,userDetail , deletePassword} ; 