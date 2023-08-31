const dotenv= require("dotenv");
dotenv.config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');


const app = express();
const PORT = 3000;


// middleware
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);

mongoose.connect(
  process.env.DB_URL
)
.then(console.log("connected to mongooo"))
.catch((err)=>console.log(err))
app.listen(PORT,()=>{
  console.log(`Backend is running on port ${PORT}`);
});

