const express = require('express');

const connectDB= require("./config/database");
const app = express();

app.use(express.json());

const userModel = require("./models/user");


app.post("/signup",async (req,res)=>{
    try{
        const newUser = await userModel(req.body);
        console.log(newUser);
        await newUser.save();
        res.status(200).json({message:"success",data:req.body})
    }catch(err){
        res.status(400).json({message:"error",data:err});
    }
})
//get user by email

app.get("/GetByEmail",async(req,res)=>{
    try{
        const user = await userModel.findOne({emailId:req.body.emailId});
        if(!user){
            res.status(404).json({message:"User not found"});
        }else{
        console.log(user);
        res.status(200).json({message:"success",data:user})
        }
    }catch(err){
        console.log(err);
        res.status(400).json({message:"error",data:err});
    }
})
app.get("/feed",async(req,res)=>{
    try{
        const user = await userModel.find();
        res.status(200).json({message:"success",data:user});
    }catch(err){
        res.status(400).json({message:"error",data:err});
    }
})
connectDB().then(()=>{
console.log("connection established")
app.listen(3000,()=>{
    console.log("listening on port 3000");
})
}).catch((err)=>{
    console.error("database connection error",err);
    process.exit(1);
})
