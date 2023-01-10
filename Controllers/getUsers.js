const express = require("express");
const User = require("../Modals/userModal");
const jwt = require("jsonwebtoken");
const { promisify} = require("util");

exports.getAllUsers= async (req,res,next)=>{
    let token;
    let checkAdmin;
    console.log(req.headers);
    try {
               
            token = req.headers.authorization.split(' ')[1];
            const decoded = await promisify(jwt.verify)(token,"top-secret-key");
            console.log(decoded);
            checkAdmin = await User.findById(decoded.id);
        
        
           
        
        if(!(checkAdmin.role==="admin")){
            res.json({
                status:"Failed"
            })
        }
        const users =await User.find();
        console.log(users);
        res.json({
            user: users
        });
    } catch (error) {
        console.log(error);
        next();
        
    }
    
   

}