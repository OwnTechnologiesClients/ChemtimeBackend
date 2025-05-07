const Category = require("../models/AddCategory");

// Add a new category
const addCategory = async (req, res) => {
  try {
    const { category, bookId, bookName} = req.body; // Get bookId from request body

    if (!category || !bookId || !bookName) {
      return res.status(400).json({ message: "Category, bookId, and bookName are required" });
    }

     // Check if category already exists
     const existingCategory = await Category.findOne({ category });
     if (existingCategory) {
       return res.status(400).json({ message: "Category already exists" });
     }

    const categoryData = new Category({ category, bookId, bookName});
    await categoryData.save();

    res.status(200).json({ message: "Category added successfully", categoryData });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
  
    res.status(200).json({ message: "Categories retrieved successfully", categories });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
};