const mongoose = require("mongoose");
const { Schema } = mongoose;



const UsersSchema = new Schema({
  // name:{
  //   type:string,
  //   required: true
  // }, 
  // email: {
  //   type:string,
  //   required: true
  // },
  // password:{
  //   type:string,
  //   required: true
  // }
  });


const User = mongoose.model('User', UsersSchema);
module.exports = User


































