const mongoose = require("mongoose");

const addBookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const addBook = mongoose.model("allBooks", addBookSchema);
module.exports = addBook;
