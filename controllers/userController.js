const express = require("express");
const userRoutes = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


// Register
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "User already existed" });
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });
  await newUser.save();
  return res.json({ status: true, message: "record registed" });
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "user is not registered" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "password is incorrect" });
  }
  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: "login successfully" });
};

// Forgot-Password
exports.forgotPassword = async (req,res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user) {
            return res.json({message:"user not registered"})
        }
        const token = jwt.sign({id: user._id}, process.env.KEY, {expiresIn:'5m'})


        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:"sannasitit@gmail.com",
                pass:"jssl eixs bpig tzxr"
                // pass:"bfjj wwyk desu ivdj"
            }
        })
        var mailOptions = {
            from:"sannasitit@gmail.com",
            to:email,
            subject:"Reset Password",
            text: `http://localhost:3000/resetPassword/${token}`
        };
       transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return res.json({message:"error sending email"})
        }else {
            return res.json({status:true, message:"email sent"})
        }
       })
    } catch (err) {
        console.log(err)
    }
}


//Reset-Password
exports.resetPassword = async(req,res) => {
  const {token} = req.params;
  const {password} = req.body;
  try {
    const decoded = await jwt.verify(token,process.env.KEY)
    const id = decoded.id;
    const hashpassword = await bcrypt.hash(password, 10)
    await User.findByIdAndUpdate({_id: id}, {password:hashpassword})
    return res.json({status:true, message:"updated password"})
  } catch (err) {
    return res.json("invalid token")
  }
}