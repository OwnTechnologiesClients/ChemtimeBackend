const express = require('express');
const router = express.Router();
const Ad = require('../models/AdSchema');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // For deleting files

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where images will be saved
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; // Accept only jpeg and png
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (jpeg, jpg, png) are allowed!'));
    }
  }
});

// POST - Create new ad
router.post('/create', upload.single('image'), async (req, res) => {
  const { category, title, description, price, originalPrice, link } = req.body;
  const image = req.file ? req.file.filename : '';

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

// GET - Get all ads
router.get('/all', async (req, res) => {
  try {
    const ads = await Ad.find();
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve ads', error });
  }
});

// PUT - Update an existing ad
router.put('/edit/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { category, title, description, price, originalPrice, link } = req.body;

  try {
    const ad = await Ad.findById(id);

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    // If a new image is uploaded, delete the old image
    if (req.file) {
      const oldImagePath = path.join(__dirname, '../uploads/', ad.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Delete the old image
      }
      ad.image = req.file.filename; // Set the new image
    }

    // Update other fields
    ad.category = category || ad.category;
    ad.title = title || ad.title;
    ad.description = description || ad.description;
    ad.price = price || ad.price;
    ad.originalPrice = originalPrice || ad.originalPrice;
    ad.link = link || ad.link;

    await ad.save();
    res.status(200).json({ message: 'Ad updated successfully!', ad });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update ad', error });
  }
});

// DELETE - Delete an ad
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const ad = await Ad.findById(id);

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    // Delete the image file from the server
    const imagePath = path.join(__dirname, '../uploads/', ad.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Delete the image file
    }

    await ad.remove();
    res.status(200).json({ message: 'Ad deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete ad', error });
  }
});

module.exports = router;
