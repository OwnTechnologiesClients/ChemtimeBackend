const express = require("express");
const { createBranch } = require("../controller/AddNewBranch.js");


const routers = express.Router()

routers.post('/post',createBranch)

module.exports = routers;