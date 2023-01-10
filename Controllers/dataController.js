const express = require("express");
const Data = require("./../Modals/dataModel");

exports.createData = async (req,res)=>{
    try {
        const data = await Data.create({
            city:req.body.city,
            code:req.body.code
        });
        res.json({
            status:"Success",
            data:data   
        });
    } catch (error) {
        res.json({
            status:"Failed"
        });
        console.log(error);
    }
};



exports.getAllData = async (req,res)=>{
    try {
        const data = await Data.find();
        
        if(req.query.page&&req.query.limit){
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 2;
        const skip = (page - 1) * limit;
        const ready = await data.slice(skip,limit+skip);
        res.json({
            status:"Success",
            data:ready   
        });
        }else{
        ready = data;
        res.json({
            status:"Success",
            data:ready   
        });
    }
    } catch (error) {
        res.json({
            status:"Failed"
        });
        console.log(error);
    }
};

exports.getData= async (req,res)=>{
    try {
        console.log(req.params.code);
        const data = await Data.findOne({code:req.params.code});
        res.json({
            status:"Success",
            data:data   
        });
    } catch (error) {
        res.json({
            status:"Failed"
        });
        console.log(error);
    }
}

exports.updateData = async (req,res)=>{
    try {
        const data = await Data.findOneAndUpdate(req.params.code,req.body,{
            new:true,
            validator:true
        });
        res.json({
            status:"Success",
            data:data   
        });
    } catch (error) {
        res.json({
            status:"Failed"
        });
        console.log(error);
    }
}

exports.deleteData = async (req,res)=>{
    try{
        const data = await Data.findOneAndDelete({code:req.body.code});
        res.json({
            status:"Success",
            data:data
        });
    }
    catch(error){
        res.json({
            status:"Failed"
        });
    }
}