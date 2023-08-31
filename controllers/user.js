const express = require("express")
const router = express.Router();
const User = require('../model/user');

const app = express();


// Create a User
app.post('/user', async (req, res) => {
    try {
      const { name, email } = req.body;
      const user = new User({ name, email });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  });


// Get All Users
app.get('/user', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });


// Get a User by ID
app.get('/user/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });


// Update a User by ID
app.put('/user/:id', async (req, res) => {
    try {
      const { name, email } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name, email },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  });



// Delete a User by ID
app.delete('/user/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndRemove(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(deletedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });



