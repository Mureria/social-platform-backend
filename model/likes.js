const mongoose = require('mongoose');
const User = require('../model/users')
const Post = require('../model/posts')



const likeSchema = new mongoose.Schema({
  likes:Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User, 
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Post, 
  }
}, {timestamps: true});



module.exports = mongoose.model('Likes', likeSchema);





 
