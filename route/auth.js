const dotenv= require("dotenv");
dotenv.config()
const router = require('express').Router()
const jwt = require("jsonwebtoken");

const User = require('../model/users')


// Login
router.post('/login', async(req, res) =>{
   try{
    const user = req.body;

    const existingUser = await User.findOne({ email: user.email });
    
      if (!existingUser) {
        return res.status(409).json({
                    "msg": "User not found"
                });
     }
     else{
        // match and compare password
        const validPassword = await bcrypt.compare(req.body.password, existingUser.password);
        if(validPassword){

             // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        // save token
        user.token = token;
        res.status(200).json(user);

        }
    }
      
   }catch{
        

   }
})

module.exports=router