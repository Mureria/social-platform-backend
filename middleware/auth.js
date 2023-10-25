const dotenv= require("dotenv");
dotenv.config()
const User = require('../model/users')


const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
     
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = decoded; 
      return  next();

      // Add user information to the request object
     
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
  }

  module.exports = {verifyToken}