const Offer = require("../models/OffersCoupons");

const addOffer = async (req, res) => {
    try {
      const { title, coupons } = req.body;
      const newOffer = new Offer({ title, coupons });
      await newOffer.save();
      res.status(201).json({ message: "Offer added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error adding offer" });
    }
  }

  const getOffers = async (req, res) => {
    try {
      const offers = await Offer.find();
      res.status(200).json({ data: offers });
    } catch (error) {
      res.status(500).json({ message: "Error fetching offers" });
    }
  };


  const updateOffer = async (req, res) => {
    try {
      const { title, coupons } = req.body;
      const existingOffer = await Offer.findOne(); // Fetch the first offer entry
  
      if (!existingOffer) {
        return res.status(404).json({
          success: false,
          message: "Offer not found",
        });
      }
  
      // Update the existing offer record
      existingOffer.title = title;
      existingOffer.coupons = coupons;
  
      const updatedOffer = await existingOffer.save();
  
      res.status(200).json({
        success: true,
        message: "Offer updated successfully",
        data: updatedOffer,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update offer",
        error: error.message,
      });
    }
  };

 module.exports = {
    addOffer,
    getOffers,
    updateOffer,
  };