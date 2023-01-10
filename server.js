const express = require("express");
const mongoose = require("mongoose");
const app = require("./app");




const DB = "mongodb+srv://erenkgc:undergraund63@cluster0.pb50lrf.mongodb.net/natours?retryWrites=true&w=majority";
mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(()=>{console.log(`DB Connection Successful`);});

const server = app.listen(5000,()=>{
    console.log(`Listening on port 5000...`);
});