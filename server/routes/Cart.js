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
router.delete("/remove-item/:itemId", otpAuth, clearCart);

module.exports = router;
