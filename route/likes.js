const router = require('express').Router()
const { unlikePost, LikePost, GetLikesForPost } = require('../controller/likes');


// Define Routes

// CREATE: Create a new like
router.post('/:postId', LikePost );

// Get likes for a post
router.get('/:postId', GetLikesForPost );

// Remove Like
router.delete('/:likeId', unlikePost );


module.exports=router


