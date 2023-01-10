const express = require("express");
const router = express.Router();
const userController = require("./../Controllers/userController");
const authController = require("./../Controllers/authController");
const getUsers = require("./../Controllers/getUsers");
router.post("/login",userController.logIn);


router.post("/signup",authController.protect,userController.createUser);
router.route("/deleteUser").post(authController.protect,userController.deleteUser);
router.route("/getallusers").post(authController.protect,getUsers.getAllUsers);


router.route("/user")


module.exports = router;