const express = require("express");
const User = require("./../Modals/userModal");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { promisify} = require("util");
exports.protect = async (req,res,next)=>{
    try {
        let token;
        if(req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(' ')[1];
            const decoded = await promisify(jwt.verify)(token,"top-secret-key");
            console.log(decoded);
            const currentUser = await User.findById(decoded.id);
            if(currentUser){
                next();
            }
        }
    }catch (error) {   
        res.json({
            status:"Failed"
        });
        console.log(error); 
    }  
}