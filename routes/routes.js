const { Router } = require('express');
const controller = require('../controllers');
const router = Router();

// auth
router.post('/login', controller.login)

// user
router.post('/users', controllers.user)
router.put('/users', controllers.user)
router.get('/users', controllers.user)
router.delete('/user', controllers.user)

// posts
router.post('/post', controllers.post)
router.put('/post', controllers.post)
router.get('/post',controllers.post)
router.delete('/post', controllers.user)


// comments
router.post('/comment', controllers.comment)
router.put('/comment', controllers.comment)
router.get('/comment',controllers.comment)
router.delete('/comment', controllers.user)



module.exports = router;