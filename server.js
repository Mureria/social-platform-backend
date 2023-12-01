const dotenv= require("dotenv");
dotenv.config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const authRoute= require('./route/auth')
const userRoute= require('./route/users');
const commentRoute= require('./route/comments');
const postRoute= require('./route/posts');
const likeRoute= require('./route/likes');

const PORT = 5000;



mongoose.connect( process.env.DB_URL,{
      w: 'majority',
    }
)
.then(console.log("connected to mongooo"))
.catch((err)=>console.log(err))

app.use(express.json());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }))
app.use("/login", authRoute)
app.use("/users",userRoute);
app.use("/comments",commentRoute);
app.use("/posts",postRoute);
app.use("/likes",likeRoute);


app.listen(PORT,()=>{
  console.log(`Backend is running on port ${PORT}`);
});






