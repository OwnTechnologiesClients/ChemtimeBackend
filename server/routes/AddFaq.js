const express = require("express");
const { addFaq, getFaq, updateFaq } = require("../controller/AddFaq.js");


const router = express.Router();

router.post("/addFaq", addFaq);
router.get("/get-faq", getFaq);
router.put("/update-faq", updateFaq);

module.exports = router;