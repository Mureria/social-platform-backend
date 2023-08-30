
const CommentSchema = new mongoose.Schema({
    text: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  });
  
  const Comment = mongoose.model('Comment', commentSchema);

  module.exports = Comment
  
  