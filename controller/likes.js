const Likes = require('../model/likes')
const Post = require('../model/posts')

// CreateLike

const CreateLike =async (req, res) => {
    try {
      const { user, postId } = req.body;

      const like = new Likes({ user, postId });

      const savedLike = await like.save();

      res.json(savedLike);
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

//   Get All Likes for a POst

const GetLikes = async (req, res) => {
    try {
      const postId = req.params.postId;
  
      // Find the post by its ID
      const post = await Post.findById(postId);
  
      if (!post) {
        // If the post doesn't exist, return a 404 Not Found response
        return res.status(404).json({ error: 'Unavailable' });
      }
  
          // Find all likes associated with the post
    const likes = await Likes.find({ postId: postId });

    // Respond with the likes for the post
    res.status(200).json(likes);
  } catch (error) {
    // Handle errors (e.g., validation errors or server errors)
    res.status(500).json({ error: 'Server error kabisa' });
  }
};



// Delete Like
const DeleteLike = async (req, res) => {
    try {
      await Likes.findByIdAndRemove(req.params.likeId);
      res.json({ message: 'Like deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  module.exports = {CreateLike, GetLikes, DeleteLike }