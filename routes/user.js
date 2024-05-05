const express = require("express"); 
const router = express.Router() ; 
const {register , login , getAll , addPassword, userDetail , deletePassword} = require("../controllers/user") ; 
const varifyToken = require("../middlewares/varifyToken"); 
const verifyLink = require("../utils/verifyLink");



router.get("/userDetail", varifyToken , userDetail);

// email varification route
router.get("/:id/verify/:token" , verifyLink); 

// public routes
router.post("/register" , register) ; 
router.post("/login" , login) ; 

// router.get("/home",(req,res)=>{
//     res.render('index'); 
// });


// Private routes
router.post("/all" , varifyToken , getAll) ; 
router.post("/add"  , varifyToken , addPassword) ; 
router.post("/deletePassword"  , varifyToken , deletePassword) ; 

module.exports = router ; 