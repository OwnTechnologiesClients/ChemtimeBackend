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
      discountAmountByPercentage,
      stock,
      bookDescription,
      bookStructure,
      howbookhelpyou,
      productDetails,
      rating,
      pincode,
      quantitySelector,
      languages,
    } = req.body;
    console.log("discAmountByPercentage",discountAmountByPercentage)
    
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
                discountAmountByPercentage,
                stock,
                bookDescription,
                bookStructure,
                howbookhelpyou,
                productDetails,
                rating,
                pincode: pincode || "", // Default empty string if not provided
                quantitySelector,
                languages,
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
          discountAmountByPercentage,
          stock,
          bookDescription,
          bookStructure,
          howbookhelpyou,
          productDetails,
          rating,
          pincode: pincode || "", // Default empty string if not provided
          quantitySelector,
          languages,
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
              discountAmountByPercentage,
              stock,
              bookDescription,
              bookStructure,
              howbookhelpyou,
              productDetails,
              rating,
              pincode: pincode || "", // Default empty string if not provided
              quantitySelector,
              languages,
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

const updateStudyMaterial = async (req, res) => {
  try {
    const {
      bookId,
      categoryName,
      bookTitle,
      amount,
      discountAmount,
      discountAmountByPercentage,
      stock,
      bookDescription,
      bookStructure,
      howbookhelpyou,
      productDetails,
      rating,
      pincode,
      quantitySelector,
      languages,
    } = req.body;

    if (!bookId || !categoryName) {
      return res.status(400).json({
        success: false,
        message: "Book ID and Category Name are required",
      });
    }

    let book = await StudyMaterial.findOne({ bookId });
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    let category = book.categories.find(
      (cat) => cat.categoryName === categoryName
    );
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    category.studyMaterials.forEach((studyMaterial) => {
      if (bookTitle) studyMaterial.bookTitle = bookTitle;
      if (amount) studyMaterial.amount = amount;
      if (discountAmount) studyMaterial.discountAmount = discountAmount;
      if (discountAmountByPercentage)
        studyMaterial.discountAmountByPercentage = discountAmountByPercentage;
      if (stock) studyMaterial.stock = stock;
      if (bookDescription) studyMaterial.bookDescription = bookDescription;
      if (bookStructure) studyMaterial.bookStructure = bookStructure;
      if (howbookhelpyou) studyMaterial.howbookhelpyou = howbookhelpyou;
      if (productDetails) studyMaterial.productDetails = productDetails;
      if (rating) studyMaterial.rating = rating;
      if (pincode) studyMaterial.pincode = pincode;
      if (quantitySelector) studyMaterial.quantitySelector = quantitySelector;
      if (languages) studyMaterial.languages = languages;
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

module.exports = {
  addStudyMaterial,
  getAllStudyMaterial,
  updateStudyMaterial,
};
