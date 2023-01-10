const express = require("express");
const router = express.Router();
const dataController = require("./../Controllers/dataController");
const authController = require("./../Controllers/authController");

router.post("/getData",dataController.getAllData);
router.post("/createData",authController.protect,dataController.createData);
router.post("/deleteData",authController.protect,dataController.deleteData);

router.route("/:code").post(dataController.getData).patch(dataController.updateData);


module.exports=router;