const Post = require('../model/posts')


// Create post

const CreatePost = async (req, res) => {
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
  };


// Get all posts

const GetPosts =  async (req, res) => {
    try {
      const post = await Post.find();
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };


// Get single user posts by id
const SinglePost = async (req, res) => {
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
  };


// Update post
const UpdatePost = async (req, res) => {
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
  };



// Delete post

const DeletePost = async (req, res) => {
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
  };


module.exports = {CreatePost, GetPosts, SinglePost, UpdatePost, DeletePost}