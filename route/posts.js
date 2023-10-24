const router = require('express').Router()
const Post = require('../model/posts')
const {verifyToken} = require('../middleware/auth');
const { GetPosts, CreatePost, SinglePost, UpdatePost, DeletePost } = require('../controller/post');

// Define Routes


// CREATE: Create a new post
router.post('/', verifyToken, CreatePost );
  
  // READ: Get all post
  router.get('/all', GetPosts);
  
  // READ: Get a single post by ID
  router.get('/:itemId', SinglePost);
  
  // UPDATE: Update an post by ID
  router.put('/:postId',  verifyToken, UpdatePost );
  
  // DELETE: Delete a post by ID
  router.delete('/:itemId',  verifyToken, DeletePost);
  
  module.exports = router;
  
  
  
  
  
  
  














module.exports=router
