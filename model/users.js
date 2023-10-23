const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },    
    lastName:{
        type:String,
        required:true
    },    
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },      
    userName:{
        type:String
    },    
    phoneNumber:{
        type:String
    },
    userCode:{
        type:String
    },
    token: {
        type:String
    }    
},{timestamps:true})

module.exports=mongoose.model("users",UserSchema)