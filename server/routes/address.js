const express = require("express");
const {
  createAddress,
  getAddresses,
  editAddress,
} = require("../controller/address.js");
const otpAuth = require("../middleware/otpverifiAuth.js");

const router = express.Router();

router.post("/create-address", otpAuth, createAddress);
router.get("/get-addresses", otpAuth, getAddresses);
router.put("/edit-address/:addressId", otpAuth, editAddress);

module.exports = router;
