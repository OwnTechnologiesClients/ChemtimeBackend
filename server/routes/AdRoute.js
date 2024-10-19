// routes/ad.js
const express = require('express');
const router = express.Router();
const Ad = require('../models/AdSchema');

// POST - Create new ad
router.post('/create', async (req, res) => {
  const { category, title, description, price, originalPrice, image,link } = req.body;

  try {
    const newAd = new Ad({
      category,
      title,
      description,
      price,
      originalPrice,
      image,
      link
    });

    await newAd.save();
    res.status(201).json({ message: 'Ad created successfully!', ad: newAd });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create ad', error });
  }
});
router.get('/all', async (req, res) => {
    try {
      const ads = await Ad.find();
      res.status(200).json(ads);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve ads', error });
    }
  });
module.exports = router;
