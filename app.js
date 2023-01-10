const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routers/userRouter");
const dataRouter = require("./Routers/dataRouter");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));
app.use( (req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin","*");
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.setHeader(
        "Access-Control-Allow-Headers",
        "*"
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });


app.use("/api/users",userRouter);
app.use("/api/datas",dataRouter);


module.exports = app;