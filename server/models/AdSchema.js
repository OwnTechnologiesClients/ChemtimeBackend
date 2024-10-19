// models/Ad.js
const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Ad', AdSchema);
