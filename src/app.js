const express = require('express');

const connectDB= require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const userAuth = require("./middleware/auth");

app.use(express.json());
app.use(cookieParser());

const userModel = require("./models/user");
const validatedata = require("./utils/validation");
const bcrypt = require('bcrypt');


app.post("/signup",async (req,res)=>{
    try{
        //whenever we register the data we have to validate the data
        validatedata(req);
        //encrypt the password
        const { firstName, lastName, emailId, password, age, gender, photoUrl, skills } = req.body;
        const existinguser =  await userModel.findOne({emailId})
            if(existinguser){
                return res.status(500).json("User already exists");
            }
        const passwordHash = await bcrypt.hash(password,10);
        req.body.password = passwordHash;
        const newUser = new userModel({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
            age,
            gender,
            photoUrl,
            skills
        });
        console.log(newUser);
        await newUser.save();
        res.status(200).json("user added successfully!!!")
    }catch(err){
        res.status(400).send("ERROR:"+err.message);
    }
})
//login user
app.post("/login",async(req,res)=>{
try{
    const{emailId,password} = req.body;
    const user = await userModel.findOne({emailId})
    if(!user){
        return res.status(400).send("Invalid credentials")
    }
    const ispasswordValid = await bcrypt.compare(password,user.password);
    if(!ispasswordValid){
        return res.status(500).send("Invalid credentials")
    }else{
        //create a jwt token
        const token = await jwt.sign({_id:user._id},"Dev@123",{expiresIn:"1h"});
        console.log(token);
        res.cookie("token",token,{httpOnly:true,maxAge:60*60*1000})
        res.status(200).send("login successfully");
    }

}catch(err){
    res.status(400).send("Error:"+err.message);
}

})

app.get("/profile",userAuth,async(req,res)=>{
    try{
    const user = req.user;
    res.send(user);
}catch(err){
    res.status(400).send("Error: "+err.message);
}
})

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user = req.user;
    console.log("sendibg connection request");
    res.send(user.firstName + " sent the connection request")

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
app.get("/GetById",async(req,res)=>{
    try{
        const user = await userModel.findById({_id:req.body._id});
        if(!user){
            res.status(404).json("User not found")
        }else{
            console.log(user)
            res.status(200).json({data:user});
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message:err})
    }
})
//get all the users from the db
app.get("/feed",async(req,res)=>{
    try{
        const user = await userModel.find();
        res.status(200).json({message:"success",data:user});
    }catch(err){
        res.status(400).json({message:"error",data:err});
    }
})
//get the user and delete
app.delete("/delete",async(req,res)=>{
    try{
        const user = await userModel.findByIdAndDelete({_id:req.body._id});
        if(!user){
            res.status(404).json("User not found or ID not found");
        }else{
            res.status(200).json("User deleted successfully!!")
        }
    }catch(err){
        console.log(user)
        res.status(500).json(err);
    }
})
//update data of the user
app.patch("/update",async(req,res)=>{
    try{
        const user = await userModel.findByIdAndUpdate({_id:req.body._id},req.body,{new:true,runValidators: true})
        if(!user){
            res.status(400).json("User not found")
        }else{
            console.log(user)
            res.status(200).json({message:"User updated successfully",data:user})
        }
    }catch(err){
        res.status(500).json({err})
        console.log(err);
    }
})
//finding the user via email and updating
app.put("/Update",async(req,res)=>{
    try{
        const user = await userModel.findOneAndUpdate({emailId:req.body.emailId},req.body,{new:true })
        if(!user){
            res.status(400).json("User not found")
        }else{
            console.log(user);
            res.status(200).json({message:"User updated successfully",data:user});
        }
    }catch(err){
        console.log(user);
        res.status(500).json(err);
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
