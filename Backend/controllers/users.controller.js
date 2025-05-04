const usersModel =require('../models/users.model')
const bcrypt =require('bcrypt')
var jwt = require('jsonwebtoken');


exports.register = async function (req,res) {
    try{
        let newUser = new usersModel(req.body)
        const hashedPassword = await bcrypt.hash(req.body.password, 10) 
        newUser.password = hashedPassword
        let user =await newUser.save()
        return res.json({message :"user registered successfully", user:{username:user.username}})
    }catch(err){
        console.log("register function error :", err);
        res.status(400).send ({
            message:err
        })
    }
    
}

exports.login = async function (req,res) {
    try{
        let user = await usersModel.findOne({username: req.body.username})
        if(!user || !await user.comparePassword(req.body.password)){
            res.status(400).send({message:'invalid name or password'})
        }else {
            const token =jwt.sign({username: user.username, _id:user.id}, 'secretkey')
            return res.json({message :"user logged in successfully", user:{username:user.username , jwt:token}})
        }
        
    }catch(err){
        console.log("login function error :", err);
        res.status(400).send ({
            message:err
        })
    }
    
}

