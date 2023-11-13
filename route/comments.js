const router = require('express').Router()
const { CreateComment, AllComments, DeleteComment } = require('../controller/comment');
const { verifyToken } = require('../middleware/auth');


// Define Routes

// Create a new comment with an author
router.post('/',   CreateComment );

// GET all comments for a particular post by post ID
router.get('/:postId', AllComments);

// DELETE a comment by ID
router.delete('/:commentId', verifyToken,  DeleteComment );

  
module.exports=router
