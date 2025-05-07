const express = require("express");
const {addCategory, getAllCategories} = require("../controller/AddCategory.js");


const router = express.Router();

router.post("/addCategory", addCategory);
router.get("/get-all-categories", getAllCategories);

module.exports = router;