const router = require('express').Router()
const Comment = require('../model/comments')
const Post = require('../model/posts')

// Define Routes

// Create a new comment with an author (assuming 'authorId' is the ObjectId of the user)
router.post('/', async (req, res) => {
  try {
    const { text, authorId, likes } = req.body;

    // Create a new Comment instance
    const comment = new Comment({ text, author: authorId, likes });

    // Save the comment to the database
    await comment.save();

    // Populate the 'author' field to get the user's name
    await comment.populate('author', 'firstName').execPopulate();

    // Respond with the created comment, now including the user's name
    res.status(201).json(comment);
  } catch (error) {
    // Handle errors (e.g., validation errors)
    res.status(400).json({ error: error.message });
  }
});



// DELETE a comment by ID
router.delete('/:commentId', async (req, res) => {
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
  });

  


// GET all comments for a particular post by post ID
router.get('/:postId/comments', async (req, res) => {
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
});





module.exports=router
