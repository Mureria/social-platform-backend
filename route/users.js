const router = require('express').Router()
const User = require('../model/users')
const {CreateUser, GetUsers, SingleUser, UpdateUser, DeleteUser} = require('../controller/user')

// Defining routes

// Create user
router.post('/',CreateUser)

 // get all users
 router.get("/all", GetUsers );
 

  //get a user using an id param
router.get("/:id", SingleUser);


// Update a user by ID
router.put('/:id', UpdateUser);
  

// delete a user 
router.delete("/:id", DeleteUser );

module.exports=router
