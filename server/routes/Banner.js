const express = require("express");
const {addBanner, getBanners} = require("../controller/Banner.js");
const upload = require("../middleware/upload.js");


const router = express.Router();

router.post("/addBanner", upload.array("bannerImages", 5), addBanner); // Allows up to 5 images
router.get("/getBanners", getBanners);

module.exports = router;
