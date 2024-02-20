
const express = require('express')
const {registerUser} =require("../controllers/userController")
const router = express.Router();

router.route('/signup').post(registerUser);

module.exports = router