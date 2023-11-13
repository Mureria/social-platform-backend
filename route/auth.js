const dotenv= require("dotenv");
dotenv.config()
const router = require('express').Router()
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')


const User = require('../model/users')


// Login
router.post('/', async(req, res) =>{
   try{
    const user = req.body;

    const existingUser = await User.findOne({ email: user.email });
    
      if (!existingUser) {
        return res.status(409).json({
                    "msg": "Invalid Credentials mzee"
                });
     }
     else{
        // match and compare password
        const validPassword = await bcrypt.compare(user.password, existingUser.password);
        if(validPassword){

             // Create token
        const token = jwt.sign(
          { user_id: user._id, email:user.email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2sec",
          }
        );

        // save token
        user.token = token
        res.status(200).json(user);

        }
       
    }
  } catch (err) {
    console.log(err);
  }
})

module.exports=router