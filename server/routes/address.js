const express = require("express");
const {createAddress} = require("../controller/address.js")

const router = express.Router()

router.post("/create-address",createAddress)

module.exports = router

