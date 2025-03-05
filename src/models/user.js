const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    firstName : 
    {type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    gender:{
        type:String
    }

})

const userModel = mongoose.model("User", userschema);

module.exports = userModel;