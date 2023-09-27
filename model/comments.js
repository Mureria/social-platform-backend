const mongoose = require('mongoose');
const User = require('../model/users')



const commentSchema = new mongoose.Schema({
  text:String,
  likes:Number,
author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User, 
    required: true,
  },
}, {timestamps: true});



module.exports = mongoose.model('Comments', commentSchema);





 
