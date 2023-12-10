const Like = require('../model/likes');
const Post = require('../model/posts');


// Create a like
const LikePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const author = req.body; 

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const existingLike = await Like.findOne( author );

    if (existingLike) {
      return res.status(400).json({ error: 'You have already liked this post' });
    }

    const like = new Like( author );

    await like.save();

    post.likes.push(like._id);

    await post.save();

    await like.populate('author', 'userName');

    res.status(201).json(like);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Delete a like
const unlikePost = async (req, res) => {
  try {
    const likeId = req.params.likeId;

    // Find the like by its ID and remove it
    const deletedLike = await Like.findByIdAndRemove(likeId);

    if (!deletedLike) {

      return res.status(404).json('Like not found');
    }

    res.status(200).json('Like deleted successfully');
  } catch (error) {
    res.status(500).json('Server error');
  }
};

// Get all likes for a post
const GetLikesForPost = async (req, res) => {
  const postId = req.params.postId; 

  try {
    const post = await Post.findById(postId)
      .populate({
        path: 'likes',
        populate: {
          path: 'author',
          select: 'userName -_id'
        },
      });

      if (!post || post.length === 0) {
        // If the post doesn't exist, return a 404 Not Found response
        return res.status(404).json('No Like ');
      }
    const likes = post.likes;

    res.status(200).json(likes);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error');
  }
};


module.exports = {LikePost, unlikePost, GetLikesForPost}