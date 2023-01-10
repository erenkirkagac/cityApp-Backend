const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
city:{
    type:String,
    required:[true,"Please type your city"],
    unique:[true,"This city is already exist"]
},
code:{
    type:Number,
    required:[true,"Please type your code"],
    unique:[true,"This code is already exist"]
}
});

const Data = mongoose.model("Data",dataSchema);
module.exports = Data;