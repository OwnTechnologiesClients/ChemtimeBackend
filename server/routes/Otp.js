const express = require("express");
const {
  generateOTP,
  verifyOTP,
  loginWithPhoneOrEmail,
  getProfile,
  updateUserProfile,
} = require("../controller/Otp");
const otpAuth = require("../middleware/otpverifiAuth");
const router = express.Router();

// router.post("/send-otp", generateOTP);
// router.post("/verify-otp", verifyOTP);
router.post("/login", loginWithPhoneOrEmail);
router.get("/profile", otpAuth, getProfile);
router.put("/update-profile", otpAuth, updateUserProfile);

module.exports = router;
