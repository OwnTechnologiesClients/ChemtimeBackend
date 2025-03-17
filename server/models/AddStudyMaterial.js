const mongoose = require("mongoose");

// Schema for study materials inside a category
const studyMaterialItemSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true },
  amount: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  discountAmountByPercentage: { type: Number, default: 0 },
  stock: { type: String },
  bookDescription: { type: String, required: true },
  bookStructure: { type: String, required: true },
  howbookhelpyou: { type: String, required: true },
  productDetails: { type: String, required: true },
  rating: { type: Number, default: 0 },
  quantitySelector: { type: [String], required: true },
  languages: { type: [String], required: true },
  pincode: { type: Number, default: "123456" },
  images: { type: [String], default: [] }, // Array of image URLs
});

// Schema for categories containing study materials
const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true }, // Category name
  studyMaterials: [studyMaterialItemSchema], // List of study materials
});

// Schema for books containing categories
const bookSchema = new mongoose.Schema(
  {
    bookId: { type: String, required: true, unique: true },
    bookName: { type: String, required: true },
    categories: [categorySchema], // List of categories under a book
  },
  { timestamps: true }
);

const StudyMaterial = mongoose.model("StudyMaterial", bookSchema);

module.exports = StudyMaterial;
