const router = require('express').Router()
const Post = require('../model/posts')

// Define Routes


// CREATE: Create a new post
router.post('/', async (req, res) => {
    try {
      const { content, authorId, comments, likes  } = req.body;
  
      // Create a new post instance
      const post = new Post({ content, author: authorId, comments, likes });
  
      // Save the post to the database
      await post.save();

      // Populate the 'author' field to get the user's name
    //   await post.populate('author', 'firstName').execPopulate();
  
      res.status(201).json(post); // Respond with the created post
    } catch (error) {
      res.status(400).json({ error: error.message }); // Handle validation errors
    }
  });
  
  // READ: Get all post
  router.get('/posts/all', async (req, res) => {
    try {
      const post = await Post.find();
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // READ: Get a single post by ID
  router.get('/:itemId', async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'ireri not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // UPDATE: Update an post by ID
  router.put('/:itemId', async (req, res) => {
    try {
      const postId = req.params.postId;
      const { content, author } = req.body;
  
      const post = await Post.findByIdAndUpdate(
        this.postId,
        { content, author },
        { new: true } // Return the updated post
      );
  
      if (!post) {
        return res.status(404).json({ error: 'post not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message }); // Handle validation errors
    }
  });
  
  // DELETE: Delete a post by ID
  router.delete('/:itemId', async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findByIdAndRemove(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'ipost not found' });
      }
  
      res.status(200).json({ message: 'Ipost deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  module.exports = router;
  
  
  
  
  
  
  














module.exports=router
