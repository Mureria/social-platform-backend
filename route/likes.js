const router = require('express').Router()
const { CreateLike, GetLikes, DeleteLike } = require('../controller/likes');
const Likes = require('../model/likes')
const Post = require('../model/posts')


// Define Routes

// CREATE: Create a new like
router.post('/', CreateLike );

// Get likes for a post
router.get('/:postId', GetLikes );

// Remove Like
router.delete('/:likeId', DeleteLike );


module.exports=router


