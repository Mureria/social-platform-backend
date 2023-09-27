const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,   
    userName:String,
    phoneNumber:String,
    userCode:String,
},{timestamps:true})

module.exports=mongoose.model("users",UserSchema)