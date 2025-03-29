const User = require("../models/User");

// ✅ Add to Cart
const addToCart = async (req, res) => {
  try {
    const { cartItem, price, quantity } = req.body;
    const userId = req.user.id;  // Extract user ID from JWT

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Check if product is already in the cart
    const existingItem = user.cart.find((item) => item.cartItem === cartItem);

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.total = existingItem.quantity * existingItem.price;
    } else {
      user.cart.push({
        cartItem,
        price,
        quantity,
        total: price * quantity,
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Failed to add to cart" });
  }
};

// ✅ Buy Now
const buyNow = async (req, res) => {
  try {
    const { cartItem, price, quantity } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Clear previous `buynow` and add current item
    user.buynow = [
      {
        cartItem,
        price,
        quantity,
        total: price * quantity,
      },
    ];

    await user.save();

    res.status(200).json({
      success: true,
      message: "Product added to Buy Now successfully",
      buynow: user.buynow,
    });
  } catch (error) {
    console.error("Error with Buy Now:", error);
    res.status(500).json({ success: false, message: "Failed to Buy Now" });
  }
};

// ✅ Get Cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Failed to get cart" });
  }
};

// ✅ Clear Cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.cart = [];  // ✅ Clear the cart
    await user.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ success: false, message: "Failed to clear cart" });
  }
};

module.exports = { addToCart, buyNow, getCart, clearCart };
