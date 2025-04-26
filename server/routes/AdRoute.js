const express = require('express');
const router = express.Router();
const Ad = require('../models/AdSchema');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises'); 
// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.random().toString(36).substring(7);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 20 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
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
    // Validate required fields
    if (!category || !title || !description || !price || !originalPrice || !link) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Convert price and originalPrice to numbers
    const numericFields = ['price', 'originalPrice'];
    numericFields.forEach(field => {
      if (typeof req.body[field] === 'string') {
        req.body[field] = parseFloat(req.body[field]);
      }
    });

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
    console.log('New ad saved:', newAd);
    res.status(201).json({ message: 'Ad created successfully!', ad: newAd });
  } catch (error) {
    console.error('Error creating ad:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', details: error.errors });
    }
    res.status(500).json({ message: 'Failed to create ad', error });
  }
});

// GET - Get all ads
router.get('/all', async (req, res) => {
  try {
    const ads = await Ad.find();
    console.log('Retrieved ads:', ads);
    res.status(200).json(ads);
  } catch (error) {
    console.error('Error retrieving ads:', error);
    res.status(500).json({ message: 'Failed to retrieve ads', error });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const adId = req.params.id;
    const ad = await Ad.findById(adId);

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    res.status(200).json(ad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
// PUT - Update an existing ad
router.put('/edit/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { category, title, description, price, originalPrice, link } = req.body;

  try {
    const ad = await Ad.findById(id);

    if (!ad) {
      console.log('Ad not found:', id);
      return res.status(404).json({ message: 'Ad not found' });
    }

    console.log('Old image:', ad.image);

    if (req.file) {
      const oldImagePath = path.join(__dirname, '../uploads/', ad.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log('Deleted old image:', oldImagePath);
      }
      ad.image = req.file.filename;
    }

    ad.category = category || ad.category;
    ad.title = title || ad.title;
    ad.description = description || ad.description;
    ad.price = price || ad.price;
    ad.originalPrice = originalPrice || ad.originalPrice;
    ad.link = link || ad.link;

    await ad.save();
    console.log('Updated ad saved:', ad);
    res.status(200).json({ message: 'Ad updated successfully!', ad });
  } catch (error) {
    console.error('Error updating ad:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', details: error.errors });
    }
    res.status(500).json({ message: 'Failed to update ad', error });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    console.log('Attempting to delete ad with ID:', id);

    const ad = await Ad.findById(id);
    if (!ad) {
      console.log('Ad not found:', id);
      return res.status(404).json({ message: 'Ad not found' });
    }

    console.log('Found ad:', ad);

    // If you want to delete the image, make sure the image path is correct
    const imagePath = path.join(__dirname, '../uploads', ad.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log('Deleted image:', imagePath);
    }

    // Deleting the ad using deleteOne
    await Ad.deleteOne({ _id: id });
    console.log('Ad deleted:', id);
    res.status(200).json({ message: 'Ad deleted successfully!' });
  } catch (error) {
    console.error('Error deleting ad:', error.message || error);
    res.status(500).json({ message: 'Failed to delete ad', error: error.message || error });
  }
});

module.exports = router;
