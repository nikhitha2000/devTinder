const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    firstName : 
    {
        type:String,
        minLength:4,
        maxLength:255,
        required:true
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        trim:true,
        unique:true
    },
    age:{
        type:Number,
        min:18
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data is not valid")
            }
        },
    },
    photoUrl:{
        type:String
    },
    about:{
        type:String,
        default:"This is a default description of the user"
    },
    skills:{
        type:[String],
    },
},
    {
        timestamps:true
    }
)

const userModel = mongoose.model("User", userschema);

module.exports = userModel;