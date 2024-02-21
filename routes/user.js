
const express = require('express')
const {registerUser, loginUser, forgotPassword, resetPassword, verify, logoutUser} =require("../controllers/userController")
const router = express.Router();

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password/:token').post(resetPassword)
router.route('/logout').get(logoutUser)
router.route('/verify').get(verify)

module.exports = router