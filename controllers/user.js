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
router.post('/signup', async (req, res) => {
    // encrypt password
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    // create new user
    User.create(req.body, (err, user) => {
        // redirect to login page
        res.redirect('/user/login')
    })
})

//Login
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

//Login Page (Get > Form)
router.get('/login', (req, res) => {
    // get the data from the request body
    const { username, password } = req.body
    User.findOne({username}, (err, user) => {
        // checking if user exists
        if (!user) {
            res.send(`User doesn't exist!`)
        } else {
            // check if password matches
            const result = bcrypt.compareSync(password, user.password)
            if (result){
                req.session.username = username
                req.session.loggedIn = true
                res.redirect('/fruits')
            }
        }
    })
})

router.get('/logout', (req, res) => {
    // destroy session and redirect to main page
    req.session.destroy((err) => {
        res.redirect('/')
    })
})

//The Acutal Registration/Submission Process (Post > Submit Form)
router.post('/login', (req, res) => {
    // get data from req.body
    const {username, password } = req.body
    User.findOne({ username }, (err, user) => {
        // checking if user exists
        if (!user) {
            res.send(`User doesn't exist!`)
        } else {
            // check if password matches
            const result = bcrypt.compareSync(password, user.password)
            if (result){
                req.session.username = username
                req.session.loggedIn = true
                res.redirect('/fruits')
            } else {
                res.send('wrong password')
            }
        }
    })
})

module.exports = router