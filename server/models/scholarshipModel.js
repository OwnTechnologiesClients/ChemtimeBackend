const mongoose = require('mongoose');

// Define the scholarship schema
const scholarshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
 
  category: {
    type: String,
    required: true,
    unique: true,
  },
  link: {
    type: String,
    required: true,
  },
 
});

// Create the model from the schema
const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

module.exports = Scholarship;
