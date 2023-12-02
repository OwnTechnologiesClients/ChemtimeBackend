const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel");
const Registration = require("../models/registrationModel");
const ApplicationForm = require("../models/applicationFormModel");
const authMiddleware = require("../middleware/authMiddleware");
const Discussion = require("../models/discussionModel");
const multer = require("multer");
const route = express.Router();

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now();
    const ext = file.mimetype.split("/")[1];
    // cb(null, uniqueSuffix+file.originalname);
    cb(null, `files-admin-${Date.now()}.jpg`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "jpg") {
    cb(null, true);
  } else {
    cb(new Error("Not a JPEG File!!"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// const upload = multer({ dest: "./public/" })

route.post("/register", upload.single("myFile"), async (req, res) => {
  // console.log(req.body)
  // console.log(req.file)
  try {
    // console.log(req.body);
    // console.log(req.file);
    // console.log(req.body)
    const studentExists = await Student.findOne({ email: req.body.email });
    if (studentExists) {
      return res.send({
        success: false,
        message: "Student already exists",
      });
    }
    req.body.myfilename = req.file.filename;
    console.log(req.body);
    const student = new Student(req.body);
    await student.save();

    console.log("hello")

    const stud = await Student.findOne({ email: req.body.email });

    return res.send({
      success: true,
      message: "Student registered Successfully",
      data: stud
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

route.post("/free-registration", async (req, res) => {
  try {
    console.log(req.body);
    const registrationExists = await Registration.findOne({
      email: req.body.email,
    });
    if (registrationExists) {
      return res.send({
        success: false,
        message: "Registration already have been done",
      });
    }

    const registration = new Registration(req.body);
    await registration.save();

    return res.send({
      success: true,
      message: "Registration done successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

route.post("/registration-form", async (req, res) => {
  try {
    console.log(req.body)
    const registrationFormExists = await ApplicationForm.findOne({
      registrationnumber: req.body.registrationnumber,
    });
    if (registrationFormExists) {
      return res.send({
        success: false,
        message: "Registration already have been done",
      });
    }

    const registration = new ApplicationForm(req.body);
    await registration.save();

    return res.send({
      success: true,
      message: "Registration done successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

route.post("/get-registration-form", async (req, res) => {
  try {
    console.log(req.body)
    const registrationFormExists = await ApplicationForm.find({
      registrationnumber: req.body.registrationNo,
    });
    if (!registrationFormExists) {
      return res.send({
        success: false,
        message: "Registration not found",
      });
    }
    const x = await ApplicationForm.findOneAndUpdate(
      { registrationnumber: req.body.registrationNo },
      { payment: true },
      { new: true }
    );
    const y = await ApplicationForm.find({
      mobilenumber: req.body.contact,
    });
    return res.send({
      success: true,
      data: y,
      message: "success",
    });

  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});




route.post("/get-history-data", async (req, res) => {
  try {
    console.log(req.body)
    
    
    const y = await ApplicationForm.find({
      mobilenumber: req.body.contactnumber,
    });
    return res.send({
      success: true,
      data: y,
      message: "success",
    });

  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// Interested In Discussing Route
route.post("/discussing", async (req, res) => {
  try {
    console.log(req.body)
    const discussionExists = await Discussion.findOne({
      email: req.body.email,
    });
    if (discussionExists) {
      return res.send({
        success: false,
        message: "You have already fill the form",
      });
    }
    const discussion = new Discussion(req.body);
    await discussion.save();

    return res.send({
      success: true,
      message: "Discussion form filled successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

route.post("/login", async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.body.email });
    if (!student) {
      return res.send({
        success: false,
        message: "Student not found!",
      });
    }
    console.log(req.body)

    if (req.body.dateofbirth !== student.dateofbirth) {
      return res.send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { userId: student._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.send({
      success: true,
      message: "User logged successfully",
      data: token,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

route.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await Student.findOne({ _id: req.body.userId });
    user.password = undefined;
    return res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = route;
