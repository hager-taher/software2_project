// const Router =require('express')
// const router = Router()
// const userController =require('../controllers/users.controller')



// router.post('/api/users/register',userController.register) //call the controller
// router.post('/api/users/login',userController.login)

// module.exports =router

const express = require('express');
const userController = require('../controllers/users.controller');

const router = express.Router();

router.post('/api/users/register', userController.register);
router.post('/api/users/login', userController.login);

module.exports = router;