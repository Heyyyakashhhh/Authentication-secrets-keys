const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{
        type : String,
        uniqure: true,

    },

    password:{
        type: String,
    }
})


const User  = new mongoose.model("User" , userSchema)
module.exports = User