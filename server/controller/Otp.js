const OTP = require("../models/otpModle");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// const generateOTP = async (req, res) => {
//   try {
//     const { phoneNumber, name, termsandconditions } = req.body;

//     if (!phoneNumber || !/^\+91[0-9]{10}$/.test(phoneNumber)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid phone number format",
//       });
//     }

//     if (!name || typeof name !== "string") {
//       return res.status(400).json({
//         success: false,
//         message: "Name is required ",
//       });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Save to MongoDB
//     const otpRecord = await OTP.create({
//       phoneNumber,
//       otp,
//       name,
//       termsandconditions,
//       expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiration
//     });
//     console.log("====>>> OTP  ", otp);

//     // ✅ Send response back
//     return res.status(200).json({
//       success: true,
//       message: `OTP sent successfully to ${phoneNumber}`,
//       phoneNumber,
//       otp,
//       name,
//       termsandconditions,
//       otpId: otpRecord._id,
//     });
//   } catch (error) {
//     console.error("Error sending OTP:", error.message);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to send OTP",
//       error: error.message,
//     });
//   }
// };

// const verifyOTP = async (req, res) => {
//   try {
//     const { phoneNumber, otp, email } = req.body;

//     // Validate input
//     if (!phoneNumber || !otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Phone number and OTP are required",
//       });
//     }

//     // Find OTP record
//     const otpRecord = await OTP.findOne({ phoneNumber, otp });

//     if (!otpRecord) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid OTP or OTP expired",
//       });
//     }

//     // Check for OTP expiration
//     if (new Date() > otpRecord.expiresAt) {
//       await OTP.deleteOne({ phoneNumber });
//       return res.status(400).json({
//         success: false,
//         message: "OTP expired. Please request a new one",
//       });
//     }

//     // ✅ OTP is valid → Check if user already exists
//     let user = await User.findOne({ phoneNumber });

//     if (!user) {
//       // If user doesn't exist, create a new one with name and phoneNumber
//       user = new User({
//         name: otpRecord.name, // Save name from OTP record
//         phoneNumber: otpRecord.phoneNumber,
//       });
//       await user.save();
//     } else {
//       // If user exists, update the name in case it has changed
//       user.name = otpRecord.name;
//       await user.save();
//     }

//     const token = jwt.sign(
//       { userId: user._id, phoneNumber: user.phoneNumber },
//       process.env.JWT_SECRET_KEY || "MyBackend",
//       { expiresIn: "1d" }
//     );

//     // Delete OTP after successful verification
//     await OTP.deleteOne({ phoneNumber });

//     res.status(200).json({
//       success: true,
//       message: "OTP verified successfully and user saved",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         phoneNumber: user.phoneNumber,
//         gender: user.gender || "",
//         email: user.email || "",
//       },
//     });
//   } catch (error) {
//     console.error("Error verifying OTP:", error.message);

//     res.status(500).json({
//       success: false,
//       message: "OTP verification failed",
//       error: error.message,
//     });
//   }
// };

// ✅ Get Profile of Authenticated User

const loginWithPhoneOrEmail = async (req, res) => {
  try {
    const { phoneNumber, email, name } = req.body;

    if (!phoneNumber && !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide either phone number or email",
      });
    }

    // Check if user exists
    let user = await User.findOne({
      $or: [{ phoneNumber }, { email }],
    });

    // If user doesn't exist, create one (name optional)
    if (!user) {
      user = new User({
        name: name || "", // Save name if provided, else empty string
        phoneNumber,
        email,
      });

      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        phoneNumber: user.phoneNumber,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY || "MyBackend",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        gender: user.gender || "",
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};



const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Extract user ID from token

    const user = await User.findById(userId);

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
        gender: user.gender || "",
        email: user.email || "",
        addresses: user.addresses || [],
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
    const userId = req.user.userId; // Extract user ID from token
    const { name, phoneNumber, gender, email, addresses } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user fields
    user.name = name || user.name;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.gender = gender || user.gender;
    user.email = email || user.email;
    if (addresses) {
      user.addresses = addresses;
    }

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

module.exports = { loginWithPhoneOrEmail, getProfile, updateUserProfile };
