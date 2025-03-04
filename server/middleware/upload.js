const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Set upload directory
const uploadDir = path.join("public");

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files in 'public/uploads/' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to avoid overwriting
  },
});

// Initialize multer for multiple file uploads
const upload = multer({
  storage: storage,
});

module.exports = upload;
