const express = require('express');
const userRoutes = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req,res) => {
    const {username, email,password} = req.body;
    const user =await User.findOne({email})
    if(user) {
        return res.json({message:"User already existed"})
    }
    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username,
        email,
        password:hashpassword,
    })
    await newUser.save()
    return res.json({status:true,  message:'record registed'})
}

exports.loginUser = async (req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user) {
        return res.json({message:"user is not registered"})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword) {
        return res.json({message:"password is incorrect"})
    }
    const token = jwt.sign({username:user.username}, process.env.KEY, {expiresIn:'1h'})
    res.cookie('token', token,{ httpOnly: true, maxAge:360000})
    return res.json({status:true, message:"login successfully"})
}


