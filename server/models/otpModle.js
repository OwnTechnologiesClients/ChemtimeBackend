const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  phoneNumber: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  termsandconditions: { type: Boolean, default: false },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // Expires in 5 mins
});

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
