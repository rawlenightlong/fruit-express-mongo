////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

//Sign Up

// Sign Up (Get > Form)
router.get('/signup', (req, res) => {
    res.render('user/signup.ejs')
})

// The Actual Registration Process (Post > Submit Form)
router.post('/signup', (req, res) => {
    res.send('signup')
})

//Login

//Login Page (Get > Form)
router.get('/login', (req, res) => {
    res.render('/user/login.ejs')
})

//The Acutal Registration/Submission Process (Post > Submit Form)
router.post('/login', (req, res) => {
    res.send('login')
})

module.exports = router