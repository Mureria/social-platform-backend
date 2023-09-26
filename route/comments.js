const router = require('express').Router()
const Comment = require('../model/comments')

// Define Routes

// Create comment
router.post('/', async(req, res) => {
    try {
        const newComment = req.body;
    
        if (!newComment) {
            // Send a 400 Bad Request response with a JSON message
            return res.status(400).json({
                "msg": "Add a comment"
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
            userCode = `${req.body.firstName}`
            userName= `${req.body.firstName}${req.body.lastName} `
            newPassword = await hashPassword(req.body.password)

            const data= {
                ...newUser,
                password:newPassword,
                userName,
                userCode

            };
           
            // Example: Creating a new user and saving it to the database
            const user = new User(data);
            await user.save();
    
            // Respond with a success message or the newly created user
            return res.status(201).json(user);
        }
    } catch (e) {
        return res.status(500).json({
            "msg": "An error occurred saving the user"
        });
    }

})









module.exports=router
