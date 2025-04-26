const User = require("../models/User");

const createAddress = async (req, res) => {
  try {
    const {
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

    const userId = req.user.id; // Extract user ID from token

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

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

    user.addresses.push(newAddress);
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


const getAddresses = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token

    const user = await User.findById(userId).select("addresses");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Addresses retrieved successfully",
      data: user.addresses,
    });
  } catch (error) {
    console.error("Error fetching addresses:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching addresses",
      error: error.message,
    });
  }
};


const editAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const updatedData = req.body;

    // Find user by their ID (assuming user is authenticated and user id is in req.user.id)
    const user = await User.findOne({ "addresses._id": addressId });
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User or address not found" });
    }

    // Find the address index in the user's addresses array
    const addressIndex = user.addresses.findIndex(address => address._id.toString() === addressId);
    
    if (addressIndex === -1) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    // Update the address
    user.addresses[addressIndex] = { ...user.addresses[addressIndex], ...updatedData };

    // Save the user document with the updated address
    await user.save();

    res.json({ success: true, message: "Address updated successfully!", data: user.addresses[addressIndex] });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



module.exports = {
  createAddress,
  getAddresses,
  editAddress,
};
