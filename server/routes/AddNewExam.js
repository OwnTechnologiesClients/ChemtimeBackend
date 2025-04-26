const express = require("express");
const { createExam } = require("../controller/AddNewExam.js");


const routers = express.Router()

routers.post('/post',createExam)

module.exports = routers;