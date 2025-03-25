const OTP = require("../models/otpModle");
const User = require("../models/User"); 

const generateOTP = async (req, res) => {
  try {
    const { phoneNumber, name, agree } = req.body;

    if (!phoneNumber || !/^\+91[0-9]{10}$/.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number format",
      });
    }

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Name is required ",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save to MongoDB
    const otpRecord = await OTP.create({
      phoneNumber,
      otp,
      name,
      agree,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiration
    });

    console.log(`OTP: ${otp} sent to ${phoneNumber}`);

    // ✅ Send response back
    return res.status(200).json({
      success: true,
      message: `OTP sent successfully to ${phoneNumber}`,
      phoneNumber,
      otp,
      name,
      agree,
      otpId: otpRecord._id,
    });
  } catch (error) {
    console.error("Error sending OTP:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    // Validate input
    if (!phoneNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone number and OTP are required",
      });
    }

    // Find OTP record
    const otpRecord = await OTP.findOne({ phoneNumber, otp });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP or OTP expired",
      });
    }

    // Check for OTP expiration
    if (new Date() > otpRecord.expiresAt) {
      await OTP.deleteOne({ phoneNumber });
      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new one",
      });
    }

    // ✅ OTP is valid → Check if user already exists
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      // If user doesn't exist, create a new one with name and phoneNumber
      user = new User({
        name: otpRecord.name, // Save name from OTP record
        phoneNumber: otpRecord.phoneNumber,
      });
      await user.save();
    } else {
      // If user exists, update the name in case it has changed
      user.name = otpRecord.name;
      await user.save();
    }

    // Delete OTP after successful verification
    await OTP.deleteOne({ phoneNumber });

    res.status(200).json({
      success: true,
      message: "OTP verified successfully and user saved",
      user: {
        id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        gender: user.gender || "",
        email: user.email || "",
      },
    });
  } catch (error) {
    console.error("Error verifying OTP:", error.message);

    res.status(500).json({
      success: false,
      message: "OTP verification failed",
      error: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const { phoneNumber } = req.params;

    // Fetch user by phoneNumber
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user: {
        id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from params
    const { name, phoneNumber, gender, email } = req.body;

    // Find the user by ID
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update the fields
    user.name = name || user.name;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.gender = gender || user.gender;
    user.email = email || user.email;

    // Save the updated profile
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

module.exports = { generateOTP, verifyOTP, getProfile, updateUserProfile };
