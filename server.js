const dotenv= require("dotenv");
dotenv.config()

const express = require ('express')
const mongoose = require ('mongoose')



const app = express();
const PORT = 3000;

// const User = require('./model/user');
// const Post = require('./model/post');
// const Comment = require('./model/comment');


mongoose.connect(
  process.env.DB_URL
)
.then(console.log("connected to mongooo"))
.catch((err)=>console.log(err))
app.listen(PORT,()=>{
  console.log(`Backend is running on port ${PORT}`);
});

