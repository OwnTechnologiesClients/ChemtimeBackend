const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { addBanner, getBanners } = require("../controller/Banner.js");

const router = express.Router();

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

router.post("/addBanner", upload.array("bannerImages", 5), addBanner);
router.get("/getBanners", getBanners);

module.exports = router;
