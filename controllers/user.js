const User = require('../models/users')
const {hashPassword} = require('../controllers/hashPassword')


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
            Code = `${req.body.firstName}`
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
        console.log("An error occurred saving the user", e);
        return res.status(500).json({
            "msg": "Internal server error"
        });
    }
}



// Get All Users
const GetUsers = async(req,res)=>{
    const  query = req.query.newUser
    try{
      const users=query ? await User.find().sort({_id:-1}).limit(5): 
      await User.find();
      res.status(200).json(users);
    }catch(err){
      res.status(500).json('No Added Users')
    };
}


//   Get Single User
const SingleUser = async(req,res)=>{
    try{
      const person =await User.findById(req.params
        .id)
        //destructuring the user details and removing the password
        // and return it in a doc form displaying other details beside password.
        const {password ,...others}=person._doc
        res.status(200).json(person)
    }catch (err){
      res.status(500).json('User Not Found')
  
    }
}



//   Update User
const UpdateUser = async(req, res) => {
    const user = await User.findById(req.params._id)  
   
       if (user) {
           user.firstName = req.body.firstName || user.firstName
           user.lastName = req.body.lastName || user.lastName
           user.email = req.body.email || user.email
           user.phoneNumber = req.body.phoneNumber || user.phoneNumber
   
           const updatedUser = await user.save()
           res.json({
               firstName:updatedUser.firstName,
               lastName:updatedUser.lastName,
               email:updatedUser.email,
               phoneNumber:updatedUser.phoneNumber,
           })
           return res.status(201).json(updatedUser);
   
       }else{
           res.status(404).json('User To Be Updated Not Found')
       }
     }

// Delete User
const DeleteUser = async(req,res)=>{
    try{
      await  User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted")
    }catch(err){
      res.status(500).json(err)
    }
  }
  module.exports = {CreateUser, GetUsers, SingleUser, UpdateUser, DeleteUser}