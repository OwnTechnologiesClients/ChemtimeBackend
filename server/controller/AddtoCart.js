const User = require("../models/User");

// ✅ Add to Cart
const addToCart = async (req, res) => {
  try {
    const { image, itemName, price, quantity, discountAmount, discountPercentage } = req.body;
    const userId = req.user.id; // Extract user ID from JWT

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // ✅ Check if product is already in the cart
    const existingItem = user.cart.find((item) => item.itemName === itemName);

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.total = existingItem.quantity * existingItem.price;

      // ✅ Update discount fields if provided
      existingItem.discountAmount = discountAmount || existingItem.discountAmount;
      existingItem.discountPercentage = discountPercentage || existingItem.discountPercentage;
    } else {
      user.cart.push({
        image,
        itemName,
        price,
        quantity,
        total: price * quantity,
        discountAmount,         
        discountPercentage 
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
    const { image, itemName, price, quantity } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // ✅ Clear previous `buynow` and add current item
    user.buynow = [
      {
        image,
        itemName,
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
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
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
    const userId = req.user.id; // Get user ID from token
    const { itemId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // ✅ Filter out the item with the given ID
    user.cart = user.cart.filter((item) => item._id.toString() !== itemId);
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
