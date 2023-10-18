const express = require("express");
const route = express.Router();
const Admin = require("../models/adminModel");

route.post("/get-details", async (req, res) => {
  try {
    const admin = await Admin.findOne({
      registration: req.body.registrationnumber,
    });
    if (!admin) {
      return res.send({
        success: false,
        message: "Admin not found!",
      });
    }

    if (req.body.cname !== admin.cname) {
      return res.send({
        success: false,
        message: "Not admin for this course",
      });
    }
    if (req.body.subject !== admin.subject) {
      return res.send({
        success: false,
        message: "Not admin for this subject",
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

module.exports = route;
