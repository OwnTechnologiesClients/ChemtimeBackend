const express = require("express");
const {addStudyMaterial, getAllStudyMaterial, updateStudyMaterial} = require("../controller/AddStudyMaterial.js");

const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");



// Ensure uploads folder exists
const uploadPath = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post("/study-material", upload.array("images", 5), addStudyMaterial);
router.get("/get-all-study-materials", getAllStudyMaterial);
router.put("/update-study-material", updateStudyMaterial);


module.exports = router;
