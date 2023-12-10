const router = require('express').Router()
const Post = require('../model/posts')
const {verifyToken} = require('../middleware/auth');
const { GetPosts, CreatePost, SinglePost, UpdatePost, DeletePost, LikePost, UnlikePost } = require('../controller/post');

// Define Routes


// CREATE: Create a new post
router.post('/', CreatePost );
  
  // READ: Get all post
  router.get('/all', GetPosts);
  
  // READ: Get a single post by ID
  router.get('/:postId', SinglePost);
  
  // UPDATE: Update an post by ID
  router.put('/:postId', UpdatePost );
  
  // DELETE: Delete a post by ID
  router.delete('/:postId',  DeletePost);
  
  
  module.exports = router;