const mongoose = require ("mongoose");
const { Schema } = mongoose;

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  });
  
  const Post = mongoose.model('Post', PostSchema);
  
  module.exports = Post