const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const userAuth = async(req,res,next)=>{
//Read the token from the req cookies
try{
const {token} = req.cookies;
if(!token){
    return res.status(401).send("Error Token is not valid please relogin");
}
const decodedobj = await jwt.verify(token,"Dev@123")
//validate the token
const {_id} = decodedobj;
const user = await userModel.findById(_id);
if(!user){
    throw new Error("user not found")
}
req.user = user;
next();
}
catch(err){
    res.status(400).send("Error:"+err.message);
}
//find the user
};

module.exports = userAuth;