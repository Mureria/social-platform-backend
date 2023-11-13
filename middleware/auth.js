const dotenv= require("dotenv");
dotenv.config()


const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'A token is required for authentication!' });
     
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = decoded; 

    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    return  next();

    
  }

  module.exports = {verifyToken}