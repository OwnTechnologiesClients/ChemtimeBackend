const express = require("express");
const { createQuesAndAnswr, getQuesAndAnswr } = require("../controller/ques_ans_controller.js");


const routers = express.Router();

routers.post("/getBranchExam", createQuesAndAnswr);
routers.get("/", getQuesAndAnswr);

module.exports = routers;
