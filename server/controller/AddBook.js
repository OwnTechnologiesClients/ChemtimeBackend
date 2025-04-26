const AddBook = require("../models/AddBook");

const addBook = async (req, res) => {
  try {
    const { bookName } = req.body;
    const book = new AddBook({ bookName });
    await book.save();
    res.status(200).json({ success: true, message: "Book Added", book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await AddBook.find(); // Fetch all books
    res.status(200).json({ success: true, books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {addBook,getBooks};