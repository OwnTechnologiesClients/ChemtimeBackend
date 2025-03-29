const express = require("express");
const {
  addToCart,
  buyNow,
  clearCart,
  getCart,
} = require("../controller/AddtoCart.js");
const otpAuth = require("../middleware/otpverifiAuth.js");

const router = express.Router();

router.post("/add-to-cart", otpAuth, addToCart);
router.post("/buy-now", otpAuth, buyNow);
router.get("/", otpAuth, getCart);
router.delete("/clear-cart", otpAuth, clearCart);

module.exports = router;
