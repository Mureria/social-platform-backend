const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  name: String, 
  email: String,
  password: String,
  });


  const User = mongoose.model('Users', UsersSchema);
  module.exports = User
















































// posts
// comments
// likes
// followers

// Register
// register user CREATE
// SINGLE USER GET
// ALL USERS GET 
// Update single user PUT
// Delete user DELETE

// Login User
// Json Webtoken (Access)
// username & password (bycrpt na hashpassword)
// validation


// main
// develop


// POST 
// Create single post, get all post, update post & delete post, get singler user posts, user id





const   = mongoose.model("Users", modelSchema);

module.exports = Schema;

