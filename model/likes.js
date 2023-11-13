const mongoose = require('mongoose');
const User = require('../model/users')



const likeSchema = new mongoose.Schema({
  likes:Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User, 
    required: true,
  },
}, {timestamps: true});



module.exports = mongoose.model('Likes', likeSchema);





 
