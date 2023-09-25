const router = require('express').Router()
const User = require('../models/users')
// const code = require('../controllers/generateUnique')
const {hashPassword} = require('../controllers/hashPassword')

// define routes
router.post('/',async(req,res)=>{
    console.log("hello+++++++++++")
    try {
        const newUser = req.body;
    
        if (!newUser) {
            // Send a 400 Bad Request response with a JSON message
            return res.status(400).json({
                "msg": "User details required"
            });
        } else {
            // Check if the user already exists in the database
            const existingUser = await User.findOne({ email: newUser.email });
    
            if (existingUser) {
                return res.status(409).json({
                    "msg": "User already exists"
                });
            }
    
            // Proceed with user creation or other logic here
            //generate user code and add it to the user object
            userCode = `${req.body.firstName}}`
            userName= `${req.body.firstName}${req.body.lastName} `
            newPassword = await hashPassword(req.body.password)

            const data= {
                ...newUser,
                password:newPassword,
                userName,
                userCode

            };
            console.log(data,"here is the data++++++++")



    
            // Example: Creating a new user and saving it to the database
            const user = new User(data);
            await user.save();
    
            // Respond with a success message or the newly created user
            return res.status(201).json(user);
        }
    } catch (e) {
        console.log("An error occurred saving the user", e);
        return res.status(500).json({
            "msg": "Internal server error"
        });
    }
    

})

module.exports=router
