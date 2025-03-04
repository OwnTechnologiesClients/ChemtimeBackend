const mongoose = require("mongoose");

// Schema for study materials inside a category
const studyMaterialItemSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true }, // Title of the book
  amount: { type: Number, required: true }, // Price of the book
  discountAmount: { type: Number, default: 0 }, // Discounted price
  bookDescription: { type: String, required: true }, // Short description
  productDetails: { type: String, required: true }, // Detailed specifications
  images: { type: [String], default: [] }, // Array of image URLs
});

// Schema for categories containing study materials
const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true }, // Category name
  studyMaterials: [studyMaterialItemSchema], // List of study materials
});

// Schema for books containing categories
const bookSchema = new mongoose.Schema({
  bookId: { type: String, required: true, unique: true },
  bookName: { type: String, required: true },
  categories: [categorySchema], // List of categories under a book
}, { timestamps: true });


const StudyMaterial = mongoose.model("StudyMaterial", bookSchema);

module.exports = StudyMaterial;
