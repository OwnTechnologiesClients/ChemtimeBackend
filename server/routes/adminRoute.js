const express = require("express");
const route = express.Router();
const Admin = require("../models/adminModel");
const ApplicationForm = require("../models/applicationFormModel");

route.post("/get-details", async (req, res) => {
  try {
    const admin = await Admin.findOne({
      email: req.body.email,
    });
    if (!admin) {
      return res.send({
        success: false,
        message: "Admin not found!",
      });
    }

    if (req.body.password !== admin.password) {
      return res.send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    return res.send({
      success: true,
      message: "Hello Admin",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

route.post("/get-adminpage-details", async (req, res) => {
  try {
    var y;
    if (req.body.contactnumber === "") {
      y = await ApplicationForm.find({registrationnumber: req.body.registrationnumber});
    } 
    else {
      y = await ApplicationForm.find({ mobilenumber: req.body.contactnumber });
    }
    return res.send({
      success: true,
      data: y,
      message: "success",
    });
  } catch (error) {
    return res.send({
      success: false,
    });
  }
});

module.exports = route;
