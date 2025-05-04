const express = require('express')
const router = express.Router()
const users = require('../../models/users')

router.post('/', (req, res) => {
    const newUser = new users({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
    });
    newUser.save().then(res.json(newUser))
})

module.exports = router