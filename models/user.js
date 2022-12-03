//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection")

////////////////////////////////////////////////
// Define Model
////////////////////////////////////////////////
// pull schema and model from mongoose

const { Schema, model} = mongoose;

// User Scehma
const userSchema = new Schema ({
    username: {type: String, required:true, unique: true},
    password: {type: String, required:true}
})

//make User Model

const User = model("User", userSchema)

module.exports = User