const express = require('express');
const router = express.Router();
const UserController = require('../controllers/posts');

// postCrud
router.post('/post', controllers.post)
router.put('/post', controllers.post)
router.get('/post',controllers.post)
router.delete('/post', controllers.user)

module.exports = router;