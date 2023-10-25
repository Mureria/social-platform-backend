const Comment = require('../model/comments');
const Post = require('../model/posts')


// Create a comment

const CreateComment = async (req, res) => {
    try {
      const { text, authorId, likes } = req.body;
  
      // Create a new Comment instance
      const comment = new Comment({ text, author: authorId, likes });
   ''
      // Save the comment t o the database
      await comment.save();
  
      // Populate the 'author' field to get the user's name
      await comment.populate('author', 'firstName').execPopulate();
  
      // Respond with the created comment, now including the user's name
      res.status(201).json(comment);
    } catch (error) {
      // Handle errors (e.g., validation errors)
      res.status(400).json({ error: error.message });
    }
  };


// GET all comments for a particular post by post ID


  const AllComments = async (req, res) => {
    try {
      const postId = req.params.postId;
  
      // Find the post by its ID
      const post = await Post.findById(postId);
  
      if (!post) {
        // If the post doesn't exist, return a 404 Not Found response
        return res.status(404).json({ error: 'Post not found' });
      }
  
          // Find all comments associated with the post
    const comments = await Comment.find({ postId: postId });
  
    // Respond with the comments for the post
    res.status(200).json(comments);
  } catch (error) {
    // Handle errors (e.g., validation errors or server errors)
    res.status(500).json({ error: 'Server error' });
  }
  };



// DELETE a comment by ID


  const DeleteComment = async (req, res) => {
    try {
      const commentId = req.params.commentId;
  
      // Find the comment by its ID and remove it
      const deletedComment = await Comment.findByIdAndRemove(commentId);
  
      if (!deletedComment) {
        // If the comment doesn't exist, return a 404 Not Found response
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      // Respond with a success message or the deleted comment
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      // Handle errors (e.g., validation errors or server errors)
      res.status(500).json({ error: 'Server error' });
    }
  }



module.exports = {CreateComment, AllComments, DeleteComment }