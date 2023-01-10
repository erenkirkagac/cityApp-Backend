const express = require("express");
const User = require("./../Modals/userModal");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { promisify} = require("util");
const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    email: Joi.string().email(),

})

const signToken = (inputId)=>{
    return jwt.sign({id:inputId},"top-secret-key",{expiresIn:90*24*60*60*1000})
};

exports.createUser = async (req,res,next)=>{

   try{
    const newUser=await  User.create({
    username:req.body.username,
    password:req.body.password,
    email:req.body.email,
    role:req.body.role
   });

   res.send({
    status:"success",
    user:newUser
   });
   
}catch(error){
    console.log(error);
    res.send(error);
    
}
}


exports.logIn = async (req,res,next)=>{
    try {
        const {username,password}=req.body;
        let token;
        const candidateUser = await User.findOne({username});
        
        if(!candidateUser||!(candidateUser.password===password)){
        
            res.json({
    
                status:"Invalid Username or Password"
            });
            return next();
        }
        token = signToken(candidateUser._id);
        res.cookie("token",token,{secure:false,httpOnly:true});
        res.status(200).json({
            status:"success",
            token,        
            user:candidateUser
        }); 
    } catch (error) {
        console.log(error);
        res.json({
            status:error
        })
    }
    
   
};

exports.deleteUser = async (req,res,next)=>{
    try {
        let token;
        if(req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(' ')[1];
            const decoded = await promisify(jwt.verify)(token,"top-secret-key");
            console.log(decoded);
            const currentUser = await User.findById(decoded.id);
            if(currentUser.role==="admin"){
                await User.findByIdAndDelete(req.body._id);
                res.json({
                    status:"success",
                    message:"User Deleted"
            });
        }
    }
    }catch (error) {   
        res.json({
            status:"Failed"
        });
        console.log(error); 
    }  
    
}