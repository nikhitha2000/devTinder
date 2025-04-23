const mongoose = require('mongoose');
const validator = require('validator');

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
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email id is not valid");
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Strong password needed");
            }
        }
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
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("photo can't be string");
            }
        }
    },
    about:{
        type:String,
        default:"This is a default description of the user"
    },
    skills:{
        type:[String],
        validate: [val => val.length <= 10, 'Skills cannot exceed 10 items']
    },
},
    {
        timestamps:true
    }
)

const userModel = mongoose.model("User", userschema);

module.exports = userModel;