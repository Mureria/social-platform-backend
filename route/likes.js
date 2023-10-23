const router = require('express').Router()
const Likes = require('../model/likes')
const Post = require('../model/posts')







// CREATE: Create a new like
router.post('/',  async (req, res) => {
    try {
      const {  authorId,  likes  } = req.body;
  
      // Create a new post instance
      const like = new Likes({  author: authorId, likes });
  
      // Save the post to the database
      await like.save();

      // Populate the 'author' field to get the user's name
    //   await post.populate('author', 'firstName').execPopulate();
  
      res.status(201).json(like); // Respond with the created post
    } catch (error) {
      res.status(400).json({ error: error.message }); // Handle validation errors
    }
  });

// Get likes for a post
router.get('/:postId', async (req, res) => {
    try {
      const postId = req.params.postId;
  
      // Find the post by its ID
      const post = await Post.findById(postId);
  
      if (!post) {
        // If the post doesn't exist, return a 404 Not Found response
        return res.status(404).json({ error: 'Unavailable' });
      }
  
          // Find all likes associated with the post
    const likes = await Likes.find({ postId: postId });

    // Respond with the likes for the post
    res.status(200).json(likes);
  } catch (error) {
    // Handle errors (e.g., validation errors or server errors)
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports=router


