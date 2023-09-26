const dotenv= require("dotenv");
dotenv.config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute= require('./route/users');
const commentRoute= require('./route/comments');

const PORT = 3000;



mongoose.connect(
  process.env.DB_URL,{
    w: 'majority',
  }
)
.then(console.log("connected to mongooo"))
.catch((err)=>console.log(err))

app.use(express.json())
app.use("/users",userRoute);
app.use("/comments",commentRoute);
app.listen(PORT,()=>{
  console.log(`Backend is running on port ${PORT}`);
});






