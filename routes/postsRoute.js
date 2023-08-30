const express = require("express")

const router = express.Router();


// Create a Post
app.post('/posts', validatePost, async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { title, content, author } = req.body;
      const post = new Post({ title, content, author });
      await post.save();
      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  });





// Get All Posts
app.get('/posts', async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });



  
// Update a Post by ID
app.put('/posts/:id', validatePost, async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { title, content } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { title, content },
        { new: true }
      );
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  });




// Delete a Post by ID
app.delete('/posts/:id', async (req, res) => {
    try {
      const deletedPost = await Post.findByIdAndRemove(req.params.id);
      if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(deletedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  });



// Get All Posts by a Single User
app.get('/users/:userId/posts', async (req, res) => {
    try {
      const userId = req.params.userId;
      const userPosts = await Post.find({ author: userId });
      res.json(userPosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch user posts' });
    }
  });


module.exports.router;