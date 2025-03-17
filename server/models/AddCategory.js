const mongoose = require("mongoose");

const addCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    bookId: {
      type: String,
      required: true,
    },
    bookName: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const AddCategory = mongoose.model("category", addCategorySchema);
module.exports = AddCategory;
