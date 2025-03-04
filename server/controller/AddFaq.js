const Faq = require("../models/AddFaq");

// Controller to add a new faq

 const addFaq = async (req, res) => {
  try {
    const {
      shippingPolicy,
      CancellationPolicy,
      ReturnPolicy,
      ReturnReplacementPolicy,
    } = req.body;

    const faq = new Faq({
      shippingPolicy,
      CancellationPolicy,
      ReturnPolicy,
      ReturnReplacementPolicy,
    });

    const savedFaq = await faq.save();
    res.status(201).json({
      success: true,
      message: "Faq added successfully",
      data: savedFaq,
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add faq",
      error: error.message,
    });
  }
};

 const getFaq = async (req, res) => {
  try {
    const faq = await Faq.find();
    res.status(200).json({
      success: true,
      message: "Faq fetched successfully",
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch faq",
      error: error.message,
    });
  }
};

 const updateFaq = async (req, res) => {
  try {
    const {
      shippingPolicy,
      CancellationPolicy,
      ReturnPolicy,
      ReturnReplacementPolicy,
    } = req.body;

    const existingFaq = await Faq.findOne(); // Fetch the first FAQ entry

    if (!existingFaq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    // Update the existing FAQ record
    existingFaq.shippingPolicy = shippingPolicy;
    existingFaq.CancellationPolicy = CancellationPolicy;
    existingFaq.ReturnPolicy = ReturnPolicy;
    existingFaq.ReturnReplacementPolicy = ReturnReplacementPolicy;

    const updatedFaq = await existingFaq.save();

    res.status(200).json({
      success: true,
      message: "FAQ updated successfully",
      data: updatedFaq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update FAQ",
      error: error.message,
    });
  }
};

module.exports = {
  addFaq,
  getFaq,
  updateFaq,
};