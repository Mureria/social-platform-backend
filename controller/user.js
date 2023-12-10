const User = require('../model/users')
const {hashPassword} = require('./hashPassword')
const jwt = require('jsonwebtoken')


// Create User
const CreateUser = async(req,res)=>{
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
            userCode = `${req.body.firstName}`
            userName= `${req.body.firstName}${req.body.lastName} `
            newPassword = await hashPassword(req.body.password)

            const data= {
                ...newUser,
                password:newPassword,
                userName,
                userCode,

            };

            // Example: Creating a new user and saving it to the database
            const user = new User(data);
            await user.save();

    
            // Respond with a success message or the newly created user
            return res.status(201).json(user);
        }
    } catch (e) {
        return res.status(500).json({
            "msg": "An error occurred saving the user",e
        });
    }
}



// Get All Users
const GetUsers = async(req,res)=>{
    
    try{
      const users= await User.find().sort({_id:-1})
      if (users){

          res.status(200).json(users);
      } 
      else{
        res.status(404).json({"msg":"Hakuna kitu kama hio we mzee!"});
      }
    }catch(err){
      res.status(500).json('An error occurred getting users')
    };
}


//   Get Single User
const SingleUser = async(req,res)=>{
    try{
      const person =await User.findById(req.params
        .id)
        
        const {password ,...others}=person._doc
        res.status(200).json(person)
    }catch (err){
      res.status(500).json('User Not Found')
  
    }
}



// 
const UpdateUser=async(req,res)=>{
    id = req.params.id
    try{

        let detailsToUpdate = req.body
        if (!detailsToUpdate){
            return res.status(400).json({
                "msg": "User details required"
        })
        


    }
    const updatedUser = await User.findOneAndUpdate(
        { _id: id }, 
        detailsToUpdate, 
        { new: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({
          msg: 'User not found',
        });
      }
  
      res.status(200).json({
        msg: 'User updated successfully',
        user: updatedUser,
      });
    }catch (e) {
        return res.status(500).json({
            "msg": "An error occurred updating the user"
        });
    }
}

// Delete User
const DeleteUser = async(req,res)=>{
    try{
      console.log(req.params.id)
      await  User.findByIdAndDelete(req.params.id);

      res.status(200).json("User has been deleted")
    }catch(err){
      res.status(500).json(err)
    }
  }


  const userCount = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
  
        if (!userCount) {
            return res.status(500).json('No users');
        }
  
        res.status(200).json(`${userCount} users`);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  module.exports = {CreateUser, GetUsers, SingleUser, UpdateUser, DeleteUser, userCount}
