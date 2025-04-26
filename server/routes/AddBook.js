const express = require("express");
const { addBook,getBooks } = require("../controller/AddBook.js");

const router = express.Router();

router.post("/addBook", addBook);
router.get("/get-all-books", getBooks);

module.exports = router;