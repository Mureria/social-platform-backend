const dotenv= require("dotenv");
dotenv.config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport')
const flash = require('express-flash') 
const session = require('express-session')

const userRoute= require('./route/users');
const commentRoute= require('./route/comments');
const postRoute= require('./route/posts');

const PORT = 3000;



mongoose.connect( process.env.DB_URL,{
      w: 'majority',
    }
)
.then(console.log("connected to mongooo"))
.catch((err)=>console.log(err))


app.use(express.json())
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use("/users",userRoute);
app.use("/comments",commentRoute);
app.use("/posts",postRoute);











app.get('/',  (req, res) => {
  res.render('index.ejs')
})




// ROUTES

//Login 
app.get('/login', (req, res) => {
  res.render('login.ejs')
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

// Register
app.get('/register', (req, res) => {
  res.render('register.ejs')
})

app.post('/register',  async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})






app.listen(PORT,()=>{
  console.log(`Backend is running on port ${PORT}`);
});






