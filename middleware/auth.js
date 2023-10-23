const jw = require("jsonwebtoken");

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }
  
    try {
      const decoded = jw.verify(token, secretKey);
      req.user = decoded; // Add user information to the request object
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }

  module.exports = {verifyToken}