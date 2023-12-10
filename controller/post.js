const Post = require('../model/posts');


// Create post

const CreatePost = async (req, res) => {
    try {
      const { content, authorId, comments, likes  } = req.body;

      // Validate
      const existingPost =  await Post.findOne({content});
      if(existingPost){
        return res.status(200).json('Posts exists!')
      }
      
    
      // Create a new post instance
      const post = new Post({ content, author: authorId, comments, likes });
    
      // Save the post to the database
      await post.save();


      // Populate the 'author' field to get the user's name
      (await post.populate('author', 'firstName'));
     

      res.status(201).json(post); // Respond with the created post
    } catch (error) {
      res.status(400).json('server error'); // Handle validation errors
    }
  };


// Get all posts

const GetPosts =  async (req, res) => {
    try {
      const posts = await Post.find()
      .populate('author', 'userName')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'userName -_id'
        },
      })
      .populate({
        path: 'likes',
        populate: {
          path: 'author',
          select: 'userName -_id' 
        },
      });
          

      if (!posts || posts.length === 0) {
        return res.status(200).json('No Posts!');
      }
      

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json('Server error');
    }
  };


// Get single user posts by id
const SinglePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const posts = await Post.find(postId)
    .populate('author', 'firstName')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: 'userName -_id'
      },
    })
    .populate({
      path: 'likes',
      populate: {
        path: 'author',
        select: 'userName -_id' 
      },
    });

    if (!posts || posts.length === 0) {
      return res.status(200).json('No Posts!');
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};



// Update post
const UpdatePost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const { content } = req.body;
      
      const post = await Post.findByIdAndUpdate(
        postId,
        { content },
        { new: true }
      ) .populate('author', 'firstName')
      .populate('comments', 'text');
  
      if (!post) {
        return res.status(404).json('Post not found');
      }
  
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json('Server error');
    }
  };



// Delete post
const DeletePost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findByIdAndRemove(postId);
  
      if (!post) {
        return res.status(404).json('Post not found');
      }
  
      res.status(200).json('Post deleted successfully');
    } catch (error) {
      res.status(500).json('Server error');
    }
  };





  


module.exports = {CreatePost, GetPosts, SinglePost, UpdatePost, DeletePost}