const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel");
const Registration = require("../models/registrationModel");
const ApplicationForm = require("../models/applicationFormModel");
const authMiddleware = require("../middleware/authMiddleware");
const route = express.Router();

route.post("/register", async (req, res) => {
    try {
        const studentExists = await Student.findOne({email: req.body.email});
        if(studentExists) {
            return res.send({
                success: false,
                message: "Student already exists"
            })
        }
        const student = new Student(req.body);
        await student.save();

        return res.send({
            success: true,
            message: "Student registered Successfully"
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
});

route.post("/free-registration", async (req, res) => {
    try {
        const registrationExists = await Registration.findOne({email: req.body.email});
        if(registrationExists) {
            return res.send({
                success: false,
                message: "Registration already have been done"
            })
        }

        const registration = new Registration(req.body);
        await registration.save();

        return res.send({
            success: true,
            message: "Registration done successfully"
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
});

route.post("/registration-form", async (req, res) => {
    try {
        const registrationFormExists = await ApplicationForm.findOne({email: req.body.email});
        if(registrationFormExists) {
            return res.send({
                success: false,
                message: "Registration already have been done"
            })
        }

        const registration = new Registration(req.body);
        await registration.save();

        return res.send({
            success: true,
            message: "Registration done successfully"
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
});

route.get("/get-registration-form", authMiddleware, async (req, res) => {
    try {
        const registrationFormExists = await ApplicationForm.find({_id: req.body.userId});
        if(!registrationFormExists) {
            return res.send({
                success: false,
                message: "Registration not done"
            })
        }

        return res.send({
            success: true,
            data: registrationFormExists
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
});

route.post("/login", async (req, res) => {
    try {
        const student = await Student.findOne({email: req.body.email});
        if(!student) {
            return res.send({
                success: false,
                message: "Student not found!"
            })
        }

        if(req.body.dateofbirth !== student.dateofbirth) {
            return res.send({
                success: false,
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign({userId: student._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});
        
        return res.send({
            success: true,
            message: "User logged successfully",
            data: token
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
});

route.get("/get-current-user", authMiddleware, async (req, res) => {
    try {
        const user = await Student.findOne({_id: req.body.userId });
        user.password = undefined;
        return res.send({
            success: true,
            message: "User fetched successfully",
            data: user
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
})






module.exports = route;