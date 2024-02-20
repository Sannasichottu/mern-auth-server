const express = require('express');
const userRoutes = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/UserModel')


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


