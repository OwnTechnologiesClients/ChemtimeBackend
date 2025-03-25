const Banners = require("../models/Banners");

// Controller to upload multiple banner images
const addBanner = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    // Save multiple image paths
    // const bannerImage = req.files.map((file) => `/${file.filename}`);
    const bannerImage = req.files.map((file) => `/uploads/${file.filename}`)
    
    const banner = new Banners({ bannerImage });
    const savedBanner = await banner.save();

    res.status(201).json({
      success: true,
      message: "Banners added successfully",
      data: savedBanner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add banners",
      error: error.message,
    });
  }
};

// Controller to get all banners
const getBanners = async (req, res) => {
  try {
    const banners = await Banners.find();
    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch banners", error: error.message });
  }
};

module.exports = {
  addBanner,
  getBanners,
};

