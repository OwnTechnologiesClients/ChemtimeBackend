const StudyMaterial = require("../models/AddStudyMaterial");

const addStudyMaterial = async (req, res) => {
  try {
    const {
      bookId,
      bookName,
      categoryName,
      bookTitle,
      amount,
      discountAmount,
      bookDescription,
      productDetails,
    } = req.body;

    // Ensure bookId exists
    if (!bookId || !bookName) {
      return res.status(400).json({
        success: false,
        message: "Book ID and Book Name are required",
      });
    }

    // Extract image file paths from multer
    const images = req.files ? req.files.map((file) => file.path) : [];

    // Find if the book already exists using bookId
    let book = await StudyMaterial.findOne({ bookId });

    if (!book) {
      // If book does not exist, create a new one
      book = new StudyMaterial({
        bookId,
        bookName,
        categories: [
          {
            categoryName,
            studyMaterials: [
              {
                bookTitle,
                amount,
                discountAmount,
                bookDescription,
                productDetails,
                images,
              },
            ],
          },
        ],
      });
    } else {
      // Find the existing category
      let category = book.categories.find(
        (cat) => cat.categoryName === categoryName
      );

      if (category) {
        // Append new study material to existing category
        category.studyMaterials.push({
          bookTitle,
          amount,
          discountAmount,
          bookDescription,
          productDetails,
          images,
        });
      } else {
        // Create a new category and add study material
        book.categories.push({
          categoryName,
          studyMaterials: [
            {
              bookTitle,
              amount,
              discountAmount,
              bookDescription,
              productDetails,
              images,
            },
          ],
        });
      }
    }

    // Save the updated document
    const savedMaterial = await book.save();

    res.status(201).json({
      success: true,
      message: "Study material added successfully",
      data: savedMaterial,
    });
  } catch (error) {
    console.error("Error adding study material:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add study material",
      error: error.message,
    });
  }
};

const getAllStudyMaterial = async (req, res) => {
  try {
    const materials = await StudyMaterial.find().lean(); // Use lean() to return plain objects
    const updatedMaterials = materials.map((book) => ({
      ...book,
      bookName:
        typeof book.bookName === "string" ? book.bookName : "Unknown Book",
    }));

    console.log(updatedMaterials);

    res.status(200).json({
      success: true,
      message: "Study materials fetched successfully",
      data: updatedMaterials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch study materials",
      error: error.message,
    });
  }
};

const updateStudyMaterial = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { bookId, categoryName, bookTitle, amount, discountAmount, bookDescription, productDetails } = req.body;

    if (!bookId || !categoryName) {
      return res.status(400).json({
        success: false,
        message: "Book ID and Category Name are required",
      });
    }

    let book = await StudyMaterial.findOne({ bookId });
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    let category = book.categories.find((cat) => cat.categoryName === categoryName);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    category.studyMaterials.forEach((studyMaterial) => {
      if (bookTitle) studyMaterial.bookTitle = bookTitle;
      if (amount) studyMaterial.amount = amount;
      if (discountAmount) studyMaterial.discountAmount = discountAmount;
      if (bookDescription) studyMaterial.bookDescription = bookDescription;
      if (productDetails) studyMaterial.productDetails = productDetails;
    });

    if (req.files && req.files.length > 0) {
      category.studyMaterials.forEach((studyMaterial) => {
        studyMaterial.images = req.files.map((file) => file.path);
      });
    }

    await book.save();

    res.status(200).json({
      success: true,
      message: "Study material updated successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error updating study material:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update study material",
      error: error.message,
    });
  }
};

const deleteStudyMaterial = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  try {
    const { id } = req.params;
    const studyMaterial = await StudyMaterial.findByIdAndDelete(id);
    if (!studyMaterial) {
      return res.status(404).json({
        success: false,
        message: "Study material not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Study material deleted",
    });
  } catch (error) {
    console.error("Error deleting study material:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete study material",
      error: error.message,
    });
  }
};

module.exports = {
  addStudyMaterial,
  getAllStudyMaterial,
  updateStudyMaterial,
  deleteStudyMaterial,
};