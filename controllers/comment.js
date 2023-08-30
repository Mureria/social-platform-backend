const express = require("express")
const router = express.Router();
const Comment = require('../model/comment')

// Create a Comment
app.post('/posts/:postId/comments', authorize, async (req, res) => {
    try {
      const { text } = req.body;
      const postId = req.params.postId;
      const comment = new Comment({ text, author: req.userId, post: postId });
      await comment.save();
      res.status(201).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create comment' });
    }
  });
  
  // Get All Comments
  app.get('/comments', async (req, res) => {
    try {
      const comments = await Comment.find();
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  });
  
  // Update a Comment by ID
  app.put('/comments/:commentId', authorize, async (req, res) => {
    try {
      const { text } = req.body;
      const commentId = req.params.commentId;
      const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId, author: req.userId },
        { text },
        { new: true }
      );
      if (!updatedComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.json(updatedComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update comment' });
    }
  });
  
  // Delete a Comment by ID
  app.delete('/comments/:commentId', authorize, async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const deletedComment = await Comment.findOneAndRemove({
        _id: commentId,
        author: req.userId,
      });
      if (!deletedComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.json(deletedComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  });
  
  // Get Comments by a Single User
  app.get('/users/:userId/comments', async (req, res) => {
    try {
      const userId = req.params.userId;
      const userComments = await Comment.find({ author: userId });
      res.json(userComments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch user comments' });
    }
  });
  

  