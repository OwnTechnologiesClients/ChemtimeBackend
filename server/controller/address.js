const User = require("../models/User");

const createAddress = async (req, res) => {
  try {
    const {
      userId,
      name,
      mobileNumber,
      alternateMobileNumber,
      pincode,
      address,
      locality,
      landmark,
      district,
      city,
      state,
      isDefault,
    } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create the new address object
    const newAddress = {
      name,
      mobileNumber,
      alternateMobileNumber,
      pincode,
      address,
      locality,
      landmark,
      district,
      city,
      state,
      isDefault,
    };

    // Append the new address to the addresses array
    user.addresses.push(newAddress);

    // Save the updated user
    await user.save();

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: newAddress,
    });
  } catch (error) {
    console.error("Error saving address:", error.message);
    res.status(500).json({
      success: false,
      message: "Error saving address",
      error: error.message,
    });
  }
};

module.exports = {
  createAddress,
};
