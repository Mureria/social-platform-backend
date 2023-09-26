const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password: { type: String, select:false },   
    userName:String,
    phoneNumber:String,
    userCode:String,
},{timestamps:true})

module.exports=mongoose.model("users",UserSchema)