const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  alternateMobileNumber: { type: String },
  pincode: { type: String, required: true },
  address: { type: String, required: true },
  locality: { type: String, required: true },
  landmark: { type: String },
  district: { type: String },
  city: { type: String },
  state: { type: String },
  isDefault: { type: Boolean, default: false },
}, { timestamps: true });

const cartItemSchema = new mongoose.Schema({
  image: { type: String, },
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },        
  discountPercentage: { type: Number, default: 0 } ,
  quantity: { type: Number, default: 1 },
  total: { type: Number }
});

const userSchema = new mongoose.Schema({
  name: { type: String,  },
  phoneNumber: { type: String,  },
  gender: { type: String,  },
  email: { type: String,  },
  addresses: [addressSchema],   // Array of addresses
  cart: [cartItemSchema],     // ✅ Array for cart items
  buynow: [cartItemSchema],   // ✅ Array for buy now items
  createdAt: { type: Date, default: Date.now }
});





const User = mongoose.model("User", userSchema);
module.exports = User;
