const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please type your username"],
        
    },
    password:{
        type:String,
        required:[true,"Please type your password"],
        unique:false
        
        
    },
    email:{
        type:String,
        required:[true,"Please type your e-mail"],
        
        
    },
    role:{
        type:String,
        required:[true],
        default:"user"
    }
});

userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
}

const User = mongoose.model("Userss",userSchema);




module.exports = User;