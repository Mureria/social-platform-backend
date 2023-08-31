const express = require('express');
const router = express.Router();
const UserControllers = require('../controllers/user');

// userCrud
router.post('/users', UserControllers.user)
router.put('/users', UserControllers.user)
router.get('/users', UserControllers.user)
router.delete('/user', UserControllers.user)


module.exports = router;
