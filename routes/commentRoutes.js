const express = require('express');
const router = express.Router();
const UserController = require('../controllers/comment');


// commentsCrud
router.post('/comment', controllers.comment)
router.put('/comment', controllers.comment)
router.get('/comment',controllers.comment)
router.delete('/comment', controllers.comment)

module.exports = router;