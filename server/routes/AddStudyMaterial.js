const express = require("express");
const {addStudyMaterial, getAllStudyMaterial, updateStudyMaterial} = require("../controller/AddStudyMaterial.js");

const upload = require("../middleware/upload.js");

const router = express.Router();

router.post("/study-material", upload.array("images", 5), addStudyMaterial);
router.get("/get-all-study-materials", getAllStudyMaterial);
router.put("/update-study-material", updateStudyMaterial);


module.exports = router;
