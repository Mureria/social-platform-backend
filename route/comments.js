const router = require('express').Router()
const User = require('../model/users')
const Comment = require('../model/comments')

// Define Routes

// Create a new comment
router.post('/', async (req, res) => {
    try {
      const { text, author, likes } = req.body;
      
      // Create a new Comment instance
      const comment = new Comment({ text, author, likes });
  
      // Save the comment to the database
      await comment.save();
  
      // Respond with the created comment
      res.status(201).json(comment);
    } catch (error) {
      // Handle errors (e.g., validation errors)
      res.status(400).json({ error: error.message });
    }
  });


 // Get all comments for a specific post

  









module.exports=router
