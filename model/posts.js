const mongoose = require('mongoose');
const User = require('../model/users')
const Comments = require('../model/comments')
const Likes = require('../model/likes')



const postSchema = new mongoose.Schema({

  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User, 
    required: true,
  },
 
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Comments,
  }],

  likes:[{
  type: mongoose.Schema.Types.ObjectId,
  ref: Likes,
}]
  
},{timestamps:true}
);



module.exports = mongoose.model('Post', postSchema);
